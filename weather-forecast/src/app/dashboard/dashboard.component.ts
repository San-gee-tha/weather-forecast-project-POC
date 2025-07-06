import { Component, OnDestroy, signal } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription, combineLatest } from 'rxjs';
import { citiesModal, unitType } from '../modals/cities.modal';
import { WeatherApiService } from '../weather-api.service';
import { CommonModule } from '@angular/common';
import { CurrentDayForecastComponent } from '../current-day-forecast/current-day-forecast.component';
import { Store } from '@ngrx/store';
import { selectSelectedUnitandCity } from '../state/app.selectors';
import { SearchComponent } from '../search/search.component';
import { DayForecast } from '../modals/weather.modal';
import { MapComponent } from '../map/map.component';


@Component({
  selector: 'app-dashboard',
  imports: [SearchComponent, CommonModule, CurrentDayForecastComponent, MapComponent],
  providers: [WeatherApiService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
  currentConditions: DayForecast | null = null;
  conditions: DayForecast[] = [];
  private actionsSub: Subscription;
  private unit: string = 'metric';

  constructor(
    private actions$: Actions,
    private weatherApiService: WeatherApiService,
    private store: Store
  ) {
    // Listen for unit changes and trigger API call
    this.actionsSub = this.store.select(selectSelectedUnitandCity).subscribe(action => {
      if(action.city != null && action.unit != null) {
      // If a city is already selected, trigger API call with new unit
        this.weatherApiService.getForecastFor5days(action.city.key, action.unit)
          .subscribe(data => {
            if (data && data.DailyForecasts && data.DailyForecasts.length > 0) {
              this.conditions = data.DailyForecasts.map((day: any) => this.extractNecessaryInfo(day));
              this.currentConditions = this.conditions[0];
              this.conditions = this.conditions.slice(1,4);
              console.log(this.conditions);
              console.log(this.currentConditions);
            } else {
              this.conditions = [];
              this.currentConditions = null;
            }
          });
        }
    });

   
  }

  extractNecessaryInfo(day: any) {
    return {
      date: day.Date,
      minTemp: day.Temperature?.Minimum?.Value,
      maxTemp: day.Temperature?.Maximum?.Value,
      tempUnit: day.Temperature?.Minimum?.Unit,
      minRealFeel: day.RealFeelTemperature?.Minimum?.Value,
      maxRealFeel: day.RealFeelTemperature?.Maximum?.Value,
      dayPhrase: day.Day?.IconPhrase,
      nightPhrase: day.Night?.IconPhrase,
      dayShort: day.Day?.ShortPhrase,
      nightShort: day.Night?.ShortPhrase,
      windDay: {
        speed: day.Day?.Wind?.Speed?.Value,
        unit: day.Day?.Wind?.Speed?.Unit,
        direction: day.Day?.Wind?.Direction?.English
      },
      windNight: {
        speed: day.Night?.Wind?.Speed?.Value,
        unit: day.Night?.Wind?.Speed?.Unit,
        direction: day.Night?.Wind?.Direction?.English
      },
      humidityDay: day.Day?.RelativeHumidity.Average,
      humidityNight: day.Night?.RelativeHumidity.Average
    };
  }

  ngOnDestroy() {
    if (this.actionsSub) {
      this.actionsSub.unsubscribe();
    }
  }
}
