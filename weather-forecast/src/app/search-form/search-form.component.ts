
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ISearchModalData , unitType } from '../modals/cities.modal';

@Component({
  selector: 'app-search-form',
  imports: [ReactiveFormsModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  // Form control for city input
  city = new FormControl('', { nonNullable: true });
  // Signal for unit toggle (metric/imperial)
  unit = signal<unitType>(unitType.METRIC);
  unitType = unitType;

  //output event for city search
  @Output() citySearch = new EventEmitter<ISearchModalData>();
  
  // Optionally, add a submit handler
  onSubmit(event: Event) {
    debugger
    event.preventDefault();
    this.citySearch.emit({searchText : this.city.value , unit: this.unit()});
  }
}

