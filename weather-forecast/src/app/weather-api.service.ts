import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ACCUWEATHER_API_KEY } from './api-keys';

@Injectable({
    providedIn: 'root'
})
export class WeatherApiService {
    apiKey = ACCUWEATHER_API_KEY;
    baseUrl = 'https://dataservice.accuweather.com/';

    constructor(private http: HttpClient) { }

    /**
     * Fetches a list of cities based on the provided city name.
     * @param city Name of the city to search for.
     * @returns Observable containing the list of cities.
     */
    getCity(city: string): Observable<any> {
        console.log('getCity called with city:', city);
        const url = `${this.baseUrl}locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${encodeURIComponent(city)}`;
        return this.http.get(url).pipe(
            catchError(error => {
                return throwError(() => error);
            })
        );
    }

    /**
     * Fetches the 5-day weather forecast for a given city key.
     * @param cityKey Key of the city to fetch the forecast for.
     * @param unit Unit of measurement (metric or imperial).
     * @returns Observable containing the weather forecast data.
     */
    getForecastFor5days(cityKey: number, unit: string): Observable<any> {
        console.log('getForecastFor5days called with cityKey:', cityKey, 'and unit:', unit);
        const url = `${this.baseUrl}forecasts/v1/daily/5day/${cityKey}?apikey=${this.apiKey}&details=true&metric=${unit === 'metric'}`;
        return this.http.get(url).pipe(
            catchError(error => {
                return throwError(() => error);
            })
        );
    }

    /**
     * Fetches geolocation data for a given city key.
     * @param cityKey Key of the city to fetch geolocation for.
     * @returns Observable containing the geolocation data.
     */
    getGeoLocation(cityKey: number): Observable<any> {
        console.log('getGeoLocation called with cityKey:', cityKey);
        const url = `${this.baseUrl}locations/v1/${cityKey}?apikey=${this.apiKey}`; 
        return this.http.get(url).pipe(
            catchError(error => {
                return throwError(() => error);
            })
        );
    }

    /**
     * Fetches reverse geolocation data based on latitude and longitude.
     * @param latitude Latitude of the location.
     * @param longitude Longitude of the location.
     * @returns Observable containing the reverse geolocation data.
     */
    getReverseGeoLocation(latitude: number, longitude: number): Observable<any> {
        console.log('getReverseGeoLocation called with latitude:', latitude, 'and longitude:', longitude);
        const url = `${this.baseUrl}locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${latitude},${longitude}`;
        return this.http.get(url).pipe(
            catchError(error => {
                return throwError(() => error);
            })
        );
    }
}
