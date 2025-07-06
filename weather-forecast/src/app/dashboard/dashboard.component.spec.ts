import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectSelectedUnitandCity } from '../state/app.selectors';
import { of } from 'rxjs';
import { WeatherApiService } from '../weather-api.service';
import { SearchComponent } from '../search/search.component';
import { MapComponent } from '../map/map.component';
import { DayForecastComponent } from '../day-forecast/day-forecast.component';
import { ChatbotComponent } from '../chat/chatbot.component';
import { ChatbotComponentStub, DayForecastComponentStub, MapComponentStub, mockForcast, mockSelectSelectedUnitandCity, SearchComponentStub } from '../mock.data';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore
  let mockWeatherService: jasmine.SpyObj<WeatherApiService>;

  beforeEach(async () => {
    mockWeatherService = jasmine.createSpyObj('WeatherApiService', ['getForecastFor5days']);
    mockWeatherService.getForecastFor5days.and.returnValue(of(mockForcast));
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, SearchComponent, MapComponent,
        DayForecastComponent, ChatbotComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectSelectedUnitandCity,
              value: [
                mockSelectSelectedUnitandCity
              ]
            },
          ],
        }),
        { provide: WeatherApiService, useValue: mockWeatherService },
      ],
    }).overrideComponent(DashboardComponent, {
      remove: {
        imports: [SearchComponent, MapComponent, DayForecastComponent, ChatbotComponent],
        providers: [WeatherApiService]

      },
      add: {
        imports: [SearchComponentStub, MapComponentStub, DayForecastComponentStub, ChatbotComponentStub],
        providers: [
          { provide: WeatherApiService, useValue: mockWeatherService }
        ]
      }
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectSelectedUnitandCity, mockSelectSelectedUnitandCity)

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute else flow on create', () => {
    mockWeatherService.getForecastFor5days.and.returnValue(of({}));
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })
});
