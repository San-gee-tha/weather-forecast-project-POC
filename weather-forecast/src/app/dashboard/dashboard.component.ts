import { Component, OnDestroy, Signal, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherApiService } from '../weather-api.service';
import { CommonModule } from '@angular/common';
import { DayForecastComponent } from '../day-forecast/day-forecast.component';
import { ChatbotComponent } from '../chat/chatbot.component';
import { Store } from '@ngrx/store';
import { selectSelectedUnitandCity } from '../state/app.selectors';
import { SearchComponent } from '../search/search.component';
import { DayForecast } from '../modals/weather.modal';
import { MapComponent } from '../map/map.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  imports: [SearchComponent, CommonModule, DayForecastComponent, MapComponent, ChatbotComponent],
  providers: [WeatherApiService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
  currentConditions = signal<DayForecast | null>(null);
  headLine = signal<string>('');
  conditions: DayForecast[] = [];
  private actionsSub: Subscription;
  error: string | null = null;

  constructor(
    private weatherApiService: WeatherApiService,
    private store: Store,
    private snackBar: MatSnackBar
  ) {
    // Listen for unit changes and trigger API call
    this.actionsSub = this.store.select(selectSelectedUnitandCity).subscribe(action => {
      if(action.city != null && action.unit != null) {
      // If a city is already selected, trigger API call with new unit
        this.weatherApiService.getForecastFor5days(action.city.key, action.unit)
          .subscribe({
            next: data => {
              if (data && data.DailyForecasts && data.DailyForecasts.length > 0) {
                this.conditions = data.DailyForecasts.map((day: any) => this.extractNecessaryInfo(day));
                this.currentConditions.set(this.conditions[0])
                this.conditions = this.conditions.slice(1,4);
                console.log(this.conditions);
                console.log(this.currentConditions);
                this.headLine.set(data.Headline?.Text || null); // Extract headLine if available
                this.error = null;
              } else {
                this.conditions = [];
                this.currentConditions.set(null)
                this.error = 'No forecast data available.';
                this.snackBar.open('No forecast data available.', 'Close', { duration: 4000 });
              }
            },
            error: err => {
              this.conditions = [];
              this.currentConditions.set(null);
              this.error = 'Failed to fetch forecast.';
              this.snackBar.open('Failed to fetch forecast.', 'Close', { duration: 4000 });
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
