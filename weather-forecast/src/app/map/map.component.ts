import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild, Inject, signal } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { selectSelectedUnitandCity } from '../state/app.selectors';
import { Store } from '@ngrx/store';
import { WeatherApiService } from '../weather-api.service';
import { geoLocation } from '../modals/weather.modal';
import { citiesModal } from '../modals/cities.modal';
import { updateCity } from '../state/app.actions';

@Component({
    selector: 'app-map',
    standalone: true,
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
    @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;
    map: any;
    accessToken: string = 'pk.eyJ1IjoiZGlsbHBpeGVsIiwiYSI6ImNqM3A1YWV4czAwa3cyd3BmeWR4OTJ4NGEifQ.atNs-3fdoNghDcrdKwtIkA'
    // accessToken: string = 'pk.eyJ1Ijoic2FuZ2VldGhhLW5hZ3UiLCJhIjoiY21jcWl6cTN6MGdwbDJpczRrOW1uZ2ZpbSJ9.y0tg-nPOYyqNcH6u_P2nAw'; // Replace with your Mapbox token mine
    isBrowser: boolean;
    private actionsSub: Subscription;
    mapConfig = signal<geoLocation>({ latitude: 0, longitude: 0 })



    constructor(@Inject(PLATFORM_ID) private platformId: Object,
        private weatherApiService: WeatherApiService,
        private store: Store) {
        this.isBrowser = isPlatformBrowser(this.platformId);

        // Listen for city changes and trigger API call
        this.actionsSub = this.store.select(selectSelectedUnitandCity).subscribe(action => {
            if (action.city) {
                this.weatherApiService.getGeoLocation(action.city.key)
                    .subscribe((geoData: any) => {
                        if (geoData && geoData.GeoPosition.Latitude && geoData.GeoPosition.Longitude) {
                            this.mapConfig.set({
                                latitude: geoData.GeoPosition.Latitude,
                                longitude: geoData.GeoPosition.Longitude,
                            });
                            this.updateOrInitMap();
                        }
                    })
            }
        })
    }

    ngAfterViewInit() {
        if (this.isBrowser && this.mapContainer) {
            this.updateOrInitMap();
        }
    }

    mapMarker: any;
    updateOrInitMap() {
        if (
            this.isBrowser &&
            this.mapContainer &&
            this.mapConfig() != null
        ) {
            const lon = this.mapConfig().longitude;
            const lat = this.mapConfig().latitude;
            let coords: [number, number] = [lon, lat];
            if (this.map) {
                // Map already initialized, just update center and marker
                this.map.setCenter(coords);
                this.map.setZoom(5); // Adjust zoom level as needed
            } else {
                import('mapbox-gl').then((mapboxgl) => {
                    this.map = new mapboxgl.Map({
                        accessToken: this.accessToken,
                        container: this.mapContainer.nativeElement,
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: coords,
                        zoom: 4
                    });
                    this.map.on('click', (e: any) => {
                        const lngLat = e.lngLat;
                        this.fetchGeoLocationFromCoords(lngLat.lat, lngLat.lng);
                    });
                });


            }
        }
    }

    fetchGeoLocationFromCoords(lat: number, lon: number) {
        console.log('Clicked coordinates:', lat, lon);
        this.mapConfig.set({ latitude: lat, longitude: lon });
        this.weatherApiService.getReverseGeoLocation(lat, lon)
            .subscribe((geoData: any) => {
                let city: citiesModal = {
                    type: 'city',
                    key: geoData.Key,
                    name: geoData.LocalizedName,
                    country: geoData.Country.LocalizedName,
                    administrativeArea: geoData.AdministrativeArea.LocalizedName
                }
                this.store.dispatch(updateCity({ city }));
            })
    }
}
