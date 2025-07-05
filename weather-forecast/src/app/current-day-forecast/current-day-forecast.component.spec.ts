import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentDayForecastComponent } from './current-day-forecast.component';
import { By } from '@angular/platform-browser';

describe('CurrentDayForecastComponent', () => {
  let component: CurrentDayForecastComponent;
  let fixture: ComponentFixture<CurrentDayForecastComponent>;

  const mockForecast = {
    date: '2025-07-05T07:00:00+05:30',
    dayPhrase: 'Thunderstorms',
    dayShort: 'Warm; a stray p.m. t-storm',
    nightPhrase: 'Partly cloudy',
    nightShort: 'Partly cloudy',
    minTemp: 28.3,
    maxTemp: 36.2,
    minRealFeel: 33.1,
    maxRealFeel: 41.8,
    windDay: { speed: 16.7, unit: 'km/h', direction: 'WSW' },
    windNight: { speed: 16.7, unit: 'km/h', direction: 'W' },
    humidityDay: { Average: 62 },
    humidityNight: { Average: 73 }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentDayForecastComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(CurrentDayForecastComponent);
    component = fixture.componentInstance;
    component.forecast = mockForecast;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display today\'s forecast details', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain("Today's Forecast");
    expect(compiled.textContent).toContain('Thunderstorms');
    expect(compiled.textContent).toContain('Partly cloudy');
    expect(compiled.textContent).toContain('28.3° - 36.2°');
    expect(compiled.textContent).toContain('33.1° - 41.8°');
    expect(compiled.textContent).toContain('16.7 km/h WSW');
    expect(compiled.textContent).toContain('16.7 km/h W');
    expect(compiled.textContent).toContain('62%');
    expect(compiled.textContent).toContain('73%');
  });
});
