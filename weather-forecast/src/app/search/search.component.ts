import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { citiesModal, unitType } from '../modals/cities.modal';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { WeatherApiService } from '../weather-api.service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { updateCity, updateUnit } from '../state/app.actions';
import { selectSelectedCity, selectSelectedUnit } from '../state/app.selectors';


@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatOptionModule,
    CommonModule,
    MatButtonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnDestroy {
  unitType = unitType;
  city = new FormControl('', { nonNullable: true });
  unitToggle = new FormControl<unitType>(unitType.IMPERIAL, { nonNullable: true });
  citiesFetched: citiesModal[] = [];
  noResultsFound: boolean = false;
  error: string | null = null;

  private citySub: any;
  private unitSub: any;
  private cityValueChangesSub: any;

  constructor(private weatherApiService: WeatherApiService, private store: Store) {
    this.citySub = this.store.select(selectSelectedCity).subscribe(city => {
      if (city && city.name) {
        this.city.setValue(city.name, { emitEvent: false });
      }
    });

    this.unitSub = this.store.select(selectSelectedUnit).subscribe(unit => {
      if (unit) {
        this.unitToggle.setValue(unit, { emitEvent: false });
      }
    });
  }


  onSelectCity(city: citiesModal) {
    // this.city.setValue(city.name);
    this.store.dispatch(updateCity({ city }));
    this.citiesFetched = []; // Clear the fetched cities after selection
  }

  ngOnInit() {
    this.cityValueChangesSub = this.city.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(value => { // if value is empty clear cities fetched
          if (value === '') {
            this.citiesFetched = [];
            this.error = null;
            this.noResultsFound = false;
            return false;
          }
          return true;
        })
      )
      .subscribe(value => {
        if (typeof (value) === 'string')
          this.getCity(value);
      });
  }

  getCity(city: string) {
    this.weatherApiService.getCity(city).subscribe({
      next: res => {
        this.citiesFetched = res.map((item: any) => {
          return {
            key: item.Key,
            name: item.LocalizedName,
            country: item.Country.LocalizedName,
            administrativeArea: item.AdministrativeArea.LocalizedName
          } as citiesModal;
        });
        this.noResultsFound = this.citiesFetched.length === 0;
        this.error = null;
      },
      error: err => {
        this.citiesFetched = [];
        this.noResultsFound = true;
        this.error = 'Error fetching cities';
      }
    });
  }

  trackById(index: number, item: citiesModal) {
    return item.key; // or any unique identifier for the item
  }

  updateUnit(event: any) {
    this.unitToggle.setValue(event.checked ? unitType.IMPERIAL : unitType.METRIC);
    this.store.dispatch(updateUnit({ unit: this.unitToggle.value }));
  }

    ngOnDestroy() {
    if (this.citySub) this.citySub.unsubscribe();
    if (this.unitSub) this.unitSub.unsubscribe();
    if (this.cityValueChangesSub) this.cityValueChangesSub.unsubscribe();
  }
}
