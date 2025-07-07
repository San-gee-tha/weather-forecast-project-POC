import { TestBed } from '@angular/core/testing';
import { WeatherApiService } from './weather-api.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('WeatherApiService', () => {
  let service: WeatherApiService;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(of({}));
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    });
    service = new WeatherApiService(httpClientSpy as any);

    service.apiKey = ""
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should invoke getcity with correct parameters', () => {
    const city = 'London';
    service.getCity(city);
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should invoke getForecastFor5days with correct parameters', () => {
    const cityKey = 12345;
    const unit = 'metric';
    service.getForecastFor5days(cityKey, unit);
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service.baseUrl}forecasts/v1/daily/5day/${cityKey}?apikey=${service.apiKey}&details=true&metric=${unit === 'metric'}`);
  });

  it('should invoke getGeoLocation with correct parameters', () => {
    const cityKey = 12345;
    service.getGeoLocation(cityKey);
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service.baseUrl}locations/v1/${cityKey}?apikey=${service.apiKey}`);
  });

  it('should invoke getReverseGeoLocation with correct parameters', () => {
    const latitude = 51.5074;
    const longitude = -0.1278;
    service.getReverseGeoLocation(latitude, longitude);
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service.baseUrl}locations/v1/cities/geoposition/search?apikey=${service.apiKey}&q=${latitude},${longitude}`);
  });

});
