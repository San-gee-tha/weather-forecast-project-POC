import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayForecast } from '../modals/weather.modal';
import { Store } from '@ngrx/store';
import { selectSelectedCity } from '../state/app.selectors';
import { citiesModal, dateModal } from '../modals/cities.modal';
import { fetchDateAndDay } from '../utils';
import { MatIconModule } from '@angular/material/icon';
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-current-day-forecast',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './current-day-forecast.component.html',
    styleUrls: ['./current-day-forecast.component.scss']
})
export class CurrentDayForecastComponent implements OnInit, AfterViewInit {
    @Input() forecast: DayForecast | null = null;
    @Input() next3days: DayForecast[] = [];
    cityName: string | null = null;
    date: dateModal | null = null; // Initialize date as null
    @ViewChild('tempChart') tempChartRef!: ElementRef<HTMLCanvasElement>;
    chart: Chart | null = null;

    constructor(private store: Store) { }

    ngOnInit() {
        if (this.forecast) {
            this.store.select(selectSelectedCity).subscribe(city => {
                this.cityName = city ? city.name : null;
            });
            this.date = fetchDateAndDay(this.forecast?.date ?? '');
        }
    }

    ngAfterViewInit() {
        // Use setTimeout to ensure the canvas is available after view init
        setTimeout(() => {
            if (this.next3days && this.next3days.length > 0 && this.tempChartRef) {
                const labels = this.next3days.map((d, i) => fetchDateAndDay(d.date).day + ' ' + fetchDateAndDay(d.date).dayNumber);
                const maxTemps = this.next3days.map(d => d.maxTemp);
                const minTemps = this.next3days.map(d => d.minTemp);
                const Humidity = this.next3days.map(d => d.humidityDay);
                this.chart = new Chart(this.tempChartRef.nativeElement, {
                    type: 'line',
                    data: {
                        labels,
                        datasets: [
                            {
                                label: 'Max Temp (°' + (this.forecast?.tempUnit || '') + ')',
                                data: maxTemps,
                                fill: false,
                                borderColor: 'rgba(10, 64, 109, 0.8)',
                                backgroundColor: 'rgba(10, 64, 109, 0.2)',
                                borderWidth: 2,
                                pointBackgroundColor: '#FFFFFF',
                                pointBorderColor: '#0A406D',
                                pointBorderWidth: 3,
                                pointHoverBorderColor: 'rgba(255, 255, 255, 0.2)',
                                pointHoverBorderWidth: 10
                            },
                            {
                                label: 'Min Temp (°' + (this.forecast?.tempUnit || '') + ')',
                                data: minTemps,
                                fill: false,
                                borderColor: 'rgba(54, 162, 235, 0.8)',
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderWidth: 2,
                                pointBackgroundColor: '#FFFFFF',
                                pointBorderColor: '#36A2EB',
                                pointBorderWidth: 3,
                                pointHoverBorderColor: 'rgba(255, 255, 255, 0.2)',
                                pointHoverBorderWidth: 10
                            },
                            {
                                label: 'Humidity (%)',
                                data: Humidity,
                                fill: true,
                                borderColor: 'rgba(255, 99, 132, 0.8)',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderWidth: 2,
                                pointBackgroundColor: '#FFFFFF',
                                pointBorderColor: '#FF6384',
                                pointBorderWidth: 3,
                                pointHoverBorderColor: 'rgba(255, 255, 255, 0.2)',
                                pointHoverBorderWidth: 10
                            },
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true
                            },
                            title: {
                                display: false,
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false  // Remove vertical lines
                                }
                            },
                            y: {
                                grid: {
                                    display: false  // Remove horizontal lines
                                }
                            }
                        }
                    }
                });
            }
        }, 0);
    }
}
