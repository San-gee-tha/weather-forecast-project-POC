import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { selectSelectedCity } from '../state/app.selectors';


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
export class SearchComponent {
  unitType = unitType;
  city = new FormControl('', { nonNullable: true });
  unitToggle = new FormControl<unitType>(unitType.IMPERIAL, { nonNullable: true });
  citiesFetched: citiesModal[] = [];

  // @Output() citySelected = new EventEmitter<{ city: citiesModal, unit: unitType }>();

  constructor(private weatherApiService: WeatherApiService, private store: Store) {
    // Listen for city updates from the store and update the form control
    this.store.select(selectSelectedCity).subscribe(city => {
      if (city && city.name) {
        this.city.setValue(city.name, { emitEvent: false });
      }
    });
  }


  onSelectCity(city: citiesModal) {
    // this.city.setValue(city.name);
    this.store.dispatch(updateCity({ city }));
    this.citiesFetched = []; // Clear the fetched cities after selection
  }

  ngOnInit() {
    this.city.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(value => { // if value is empty clear cities fetched
            if (value === '') {
              this.citiesFetched = [];
              return false;
            }
            return true;
          })
      )
      .subscribe(value => {
        this.getCity(value);
      });
  }


  getCity(city: string) {
    this.weatherApiService.getCity(city).subscribe(res => {
      console.log('City data:', res);
      this.citiesFetched = res.map((item: any) => {
        return {
          key: item.Key,
          name: item.LocalizedName,
          country: item.Country.LocalizedName,
          administrativeArea: item.AdministrativeArea.LocalizedName
        } as citiesModal;
      }
      )
    })
  }

  trackById(index: number, item: citiesModal) {
    return item.key; // or any unique identifier for the item
  }

  updateUnit(event: any) {
    debugger
    this.unitToggle.setValue(event.checked ? unitType.IMPERIAL : unitType.METRIC);
    this.store.dispatch(updateUnit({ unit: this.unitToggle.value }));
  }
}
