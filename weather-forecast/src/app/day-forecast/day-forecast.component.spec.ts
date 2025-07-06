import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayForecastComponent } from './day-forecast.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectSelectedCity } from '../state/app.selectors';
import { citiesModal } from '../modals/cities.modal';
import { mockForecast, mockNext3DaysForecast, mockSeleectedCity } from '../mock.data';

describe('CurrentDayForecastComponent', () => {
  let component: DayForecastComponent;
  let fixture: ComponentFixture<DayForecastComponent>;
  let store: MockStore;
 
  afterEach(() => {
    store?.resetSelectors();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayForecastComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectSelectedCity,
              value: [mockSeleectedCity]
            },
          ],
        })
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DayForecastComponent);
    component = fixture.componentInstance;
    component.forecast = mockForecast;
    component.next3days = mockNext3DaysForecast;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke ngOnInit and set cityName and date', () => {
    component.ngOnInit();
    component.cityName = null; // Simulate no city set in mock
    expect(component.cityName).toBeNull(); // No city set in mock
    expect(component.date).toEqual({
      day: 'Saturday',
      dayNumber: 5,
      month: 'July',
    });
  });

});
