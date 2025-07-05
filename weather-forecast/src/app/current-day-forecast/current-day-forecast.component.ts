import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayForecast } from '../modals/weather.modal';
import { Store } from '@ngrx/store';
import { selectSelectedCity } from '../state/app.selectors';
import { citiesModal, dateModal } from '../modals/cities.modal';
import { fetchDateAndDay } from '../utils';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-current-day-forecast',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './current-day-forecast.component.html',
    styleUrls: ['./current-day-forecast.component.scss']
})
export class CurrentDayForecastComponent implements OnInit {
    @Input() forecast: DayForecast | null = null;
    cityName: string | null = null;
    date: dateModal | null = null; // Initialize date as null
    constructor(private store: Store) { }

    ngOnInit() {
        if (this.forecast) {
            this.store.select(selectSelectedCity).subscribe(city => {
                this.cityName = city ? city.name : null;
            });
            this.date = fetchDateAndDay(this.forecast?.date ?? '');
        }
    }


}
