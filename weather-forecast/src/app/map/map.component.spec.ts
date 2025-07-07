import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { PLATFORM_ID } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { WeatherApiService } from '../weather-api.service';
import { of, throwError } from 'rxjs';
import { selectSelectedUnitandCity } from '../state/app.selectors';
import { updateCity } from '../state/app.actions';
import { unitType, citiesModal } from '../modals/cities.modal';
import mapboxgl from 'mapbox-gl';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let store: MockStore;
  let weatherApiServiceSpy: jasmine.SpyObj<WeatherApiService>;

  beforeEach(async () => {
    weatherApiServiceSpy = jasmine.createSpyObj('WeatherApiService', ['getGeoLocation', 'getReverseGeoLocation']);
    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: WeatherApiService, useValue: weatherApiServiceSpy },
        provideMockStore({
          selectors: [
            {
              selector: selectSelectedUnitandCity,
              value: { city: { key: 123, name: 'Test City', country: 'Test Country', administrativeArea: 'Test Area', type: 'city' }, unit: unitType.METRIC }
            }
          ]
        })
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    component.map =
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getGeoLocation and update mapConfig on city change', () => {
    const geoData = { GeoPosition: { Latitude: 10, Longitude: 20 } };
    weatherApiServiceSpy.getGeoLocation.and.returnValue(of(geoData));
    // Simulate store selector emitting a new city
    store.overrideSelector(selectSelectedUnitandCity, { city: { key: 456, name: 'New City', country: 'Country', administrativeArea: 'Area', type: 'city' }, unit: unitType.METRIC });
    store.refreshState();
    fixture.detectChanges();
    expect(weatherApiServiceSpy.getGeoLocation).toHaveBeenCalledWith(456);
    expect(component.mapConfig().latitude).toBe(10);
    expect(component.mapConfig().longitude).toBe(20);
  });

   it('should call getGeoLocation and update mapConfig on city change error', () => {
    weatherApiServiceSpy.getGeoLocation.and.returnValue(throwError(() => new Error('Failed to fetch geolocation')));
    store.overrideSelector(selectSelectedUnitandCity, { city: { key: 456, name: 'New City', country: 'Country', administrativeArea: 'Area', type: 'city' }, unit: unitType.METRIC });
    store.refreshState();
    fixture.detectChanges();
    expect(weatherApiServiceSpy.getGeoLocation).toHaveBeenCalledWith(456);
  });

  it('should dispatch updateCity on fetchGeoLocationFromCoords', () => {
    const geoData = {
      Key: 789,
      LocalizedName: 'Clicked City',
      Country: { LocalizedName: 'Clicked Country' },
      AdministrativeArea: { LocalizedName: 'Clicked Area' }
    };
    weatherApiServiceSpy.getReverseGeoLocation.and.returnValue(of(geoData));
    spyOn(store, 'dispatch');
    component.fetchGeoLocationFromCoords(11, 22);
    expect(weatherApiServiceSpy.getReverseGeoLocation).toHaveBeenCalledWith(11, 22);
    expect(store.dispatch).toHaveBeenCalledWith(updateCity({
      city: {
        key: 789,
        name: 'Clicked City',
        country: 'Clicked Country',
        administrativeArea: 'Clicked Area',
        type: 'city'
      }
    }));
  });

   it('should dispatch updateCity on fetchGeoLocationFromCoords', () => {
    weatherApiServiceSpy.getReverseGeoLocation.and.returnValue(throwError(() => new Error('Failed to fetch reverse geolocation')));
    spyOn(store, 'dispatch');
    component.fetchGeoLocationFromCoords(11, 22);
    expect(weatherApiServiceSpy.getReverseGeoLocation).toHaveBeenCalledWith(11, 22);
  });
});
