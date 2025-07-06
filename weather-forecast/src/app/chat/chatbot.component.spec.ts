import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from './chatbot.component';
import { WeatherApiService } from '../weather-api.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { unitType } from '../modals/cities.modal';
import { ElementRef } from '@angular/core';
import { mockSeleectedCity } from '../mock.data';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;
  let weatherApiSpy: jasmine.SpyObj<WeatherApiService>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    weatherApiSpy = jasmine.createSpyObj('WeatherApiService', ['getCity', 'getGeoLocation', 'getReverseGeoLocation']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: WeatherApiService, useValue: weatherApiSpy },
        { provide: Store, useValue: storeSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ChatbotComponent);
    weatherApiSpy.getCity.and.returnValue(of(mockSeleectedCity)); // Mock getCity to return an empty array initially
    component = fixture.componentInstance;
    component.chatMessagesRef = { nativeElement: document.createElement('div') } as ElementRef<HTMLDivElement>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with a bot greeting', () => {
    component.ngOnInit();
    expect(component.messages[0].from).toBe('bot');
    expect(component.messages[0].text).toContain('Hi!');
  });

  it('should show city options after user enters a city', () => {
    weatherApiSpy.getCity.and.returnValue(of([
      { Key: 1, LocalizedName: 'City1', Country: { LocalizedName: 'Country1' }, AdministrativeArea: { LocalizedName: 'Area1' } },
      { Key: 2, LocalizedName: 'City2', Country: { LocalizedName: 'Country2' }, AdministrativeArea: { LocalizedName: 'Area2' } }
    ]));
    component.chatState = 'askCity';
    component.userInput = 'TestCity';
    component.sendMessage();
    expect(weatherApiSpy.getCity).toHaveBeenCalledWith('TestCity');
    expect(component.messages.some(m => m.cities && m.cities.length === 2)).toBeTrue();
  });

  it('should proceed to askUnit after city is selected', () => {
    const cityObj = { key: 1, name: 'City1', country: 'Country1', administrativeArea: 'Area1', type: 'city' };
    component.chatState = 'chooseCity';
    component.sendMessage(cityObj, 'city');
    expect(component.chatState).toBe('askUnit');
    expect(component.messages[component.messages.length-1].text).toContain('Celsius');
  });

  
  it('should go to confirmFetch and then update store after unit is selected', (done) => {
    const cityObj = { key: 1, name: 'City1', country: 'Country1', administrativeArea: 'Area1', type: 'city' };
    component.chatData = { city: cityObj, unit: unitType.METRIC };
    component.chatState = 'askUnit';
    component.sendMessage('Fahrenheit', 'unit');
    expect(component.chatState).toBe('fetching');
    // Simulate confirmFetch state
    component.processChatState('', undefined, true);
    setTimeout(() => {
      expect(storeSpy.dispatch).toHaveBeenCalled();
      expect(component.chatState).toBe('restart');
      done();
    }, 1100);
  });

  it('should invole toggleCollapse and toggle the collapsed state', () => {
    const initialCollapsedState = component.collapsed;
    component.toggleCollapse();
    expect(component.collapsed).toBe(!initialCollapsedState);
    // If collapsed, it should reset the chat state and messages
    if (component.collapsed) {
      expect(component.chatState).toBe('start');
      expect(component.messages.length).toBe(0);
      expect(component.cityOptions.length).toBe(0);
    }
  });

  it('should cover ask unit flow ', () => {
    component.chatData =  {city : { key: 1, name: 'City1', country: 'Country1', administrativeArea: 'Area1', type: 'city' } , unit: unitType.METRIC};
    component.sendMessage({ key: 1, name: 'City1', country: 'Country1', administrativeArea: 'Area1', type: 'city' }, 'city');
    component.chatState = 'askUnit';
    component.processChatState('', undefined, true);
    expect(component.chatState).toBe('confirmFetch');
  });

    it('should cover ask unit flow else block ', () => {
    component.chatData = undefined
    component.chatState = 'askUnit';
    component.processChatState('', undefined, true);
    expect(component.chatState).toBe('askCity');
  });

  it('should cover restart flow', () => {
    component.chatState = 'restart';
    component.processChatState('', undefined, true);
    expect(component.chatState).toBe('askCity');
  });
});
