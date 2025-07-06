import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { WeatherApiService } from '../weather-api.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { unitType, citiesModal } from '../modals/cities.modal';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let weatherApiSpy: jasmine.SpyObj<WeatherApiService>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    weatherApiSpy = jasmine.createSpyObj('WeatherApiService', ['getCity']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    storeSpy.select.and.returnValue(of(undefined));
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SearchComponent],
      providers: [
        { provide: WeatherApiService, useValue: weatherApiSpy },
        { provide: Store, useValue: storeSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set cities on getCity', () => {
    const apiResult = [
      { Key: 1, LocalizedName: 'City1', Country: { LocalizedName: 'Country1' }, AdministrativeArea: { LocalizedName: 'Area1' } }
    ];
    weatherApiSpy.getCity.and.returnValue(of(apiResult));
    component.getCity('City1');
    expect(weatherApiSpy.getCity).toHaveBeenCalledWith('City1');
    expect(component.citiesFetched.length).toBe(1);
    expect(component.citiesFetched[0].name).toBe('City1');
  });

  it('should dispatch updateCity and clear citiesFetched on onSelectCity', () => {
    const city: citiesModal = { key: 1, name: 'City1', country: 'Country1', administrativeArea: 'Area1', type: 'city' };
    component.citiesFetched = [city];
    component.onSelectCity(city);
    expect(storeSpy.dispatch).toHaveBeenCalled();
    expect(component.citiesFetched.length).toBe(0);
  });

  it('should update unit and dispatch updateUnit on updateUnit', () => {
    const event = { checked: true };
    component.unitToggle.setValue(unitType.METRIC);
    component.updateUnit(event);
    expect(component.unitToggle.value).toBe(unitType.IMPERIAL);
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });

  it('should clear citiesFetched if city value is empty', fakeAsync(() => {
    component.citiesFetched = [{ key: 1, name: 'City1', country: 'Country1', administrativeArea: 'Area1', type: 'city' }];
    component.ngOnInit();
    component.city.setValue('');
    tick(400);
    expect(component.citiesFetched.length).toBe(0);
  }));

  it('should invoke trackById with item key', () => {
    const item: citiesModal = { key: 1, name: 'City1', country: 'Country1', administrativeArea: 'Area1', type: 'city' };
    const result = component.trackById(0, item);
    expect(result).toBe(item.key);
  });

  it('should invoke getcity',  fakeAsync(() => {
   let getCitySpy =  spyOn(component, 'getCity');
   component.city.setValue('london');
   tick(400);
    expect(getCitySpy).toHaveBeenCalled()
  }));
});
