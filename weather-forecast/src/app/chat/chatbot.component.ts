import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherApiService } from '../weather-api.service';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { updateUnit, updateCity } from '../state/app.actions';
import { unitType, citiesModal } from '../modals/cities.modal';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    FormsModule, // Import FormsModule for two-way data binding
    CommonModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements AfterViewInit, AfterViewChecked {
  messages: { from: 'user' | 'bot', text: string, cities?: any[], timestamp: Date }[] = [
  ];
  userInput = '';

  chatState: string = 'start';
  chatData: { city: citiesModal; unit: unitType; } | undefined;
  cityOptions: any[] = [];

  collapsed = true;

  @ViewChild('chatMessages') chatMessagesRef!: ElementRef<HTMLDivElement>;
  private shouldScroll = false;

  constructor(private weatherApi: WeatherApiService, private store: Store) { }

  ngOnInit() {
    // Initialize chat state or any other setup if needed
    this.chatState = 'start';
    this.processChatState(''); // Start the chat flow
  }
  sendMessage(data?: any, type?: string) {
    if (type === 'city' && data) {
      // User clicked a city button
      if (!this.chatData) {
        this.chatData = { city: data, unit: unitType.METRIC };
      } else {
        this.chatData.city = data;
      }
      this.addMessage('user', data.name);
      this.processChatState(data.LocalizedName, data);
      return;
    }
    else if (type === 'unit' && data) {
      // User selected a unit
      if (this.chatData) {
        if (data.toLowerCase().includes("f")) {
          this.chatData.unit = unitType.IMPERIAL;
        } else {
          this.chatData.unit = unitType.METRIC;
        }
        this.addMessage("user", `${this.chatData.unit === unitType.METRIC ? "Celsius" : "Fahrenheit"}.`);
        // Instead of updating the store here, go to confirmFetch state
        this.chatState = 'confirmFetch';
        this.processChatState('', undefined, true);
      }
      return;
    }
    if (this.userInput.trim()) {
      this.addMessage('user', this.userInput);
      this.processChatState(this.userInput);
      this.userInput = '';
    }
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  addMessage(from: 'user' | 'bot', text: string, cities?: any[]) {
    this.messages.push({ from, text, cities, timestamp: new Date() });
    this.shouldScroll = true;
  }

  private scrollToBottom() {
    if (this.chatMessagesRef && this.chatMessagesRef.nativeElement) {
      setTimeout(() => {
        this.chatMessagesRef.nativeElement.scrollTop = this.chatMessagesRef.nativeElement.scrollHeight;
      }, 0);
    }
  }

  processChatState(input: string, cityObj?: any, fromUnitSelect?: boolean) {
    switch (this.chatState) {
      case "start":
        this.addMessage("bot", "Hi! Want help checking the weather? Type the city you want to check.");
        this.chatState = "askCity";
        break;
      case "askCity":
        // Call weather service to get city options
        this.weatherApi.getCity(input).subscribe((cities: any[]) => {
          if (cities && cities.length > 0) {
            this.cityOptions = cities.map((item: any) => {
              return {
                key: item.Key,
                name: item.LocalizedName,
                country: item.Country.LocalizedName,
                administrativeArea: item.AdministrativeArea.LocalizedName
              } as citiesModal;
            }
            )
            this.addMessage('bot', 'Which city do you mean?', this.cityOptions);
            this.chatState = 'chooseCity';
          } else {
            this.addMessage('bot', 'Sorry, I could not find any matching cities. Try again.');
            this.addMessage('bot', 'Type a new city, to try again');
            this.chatState = 'askCity';
          }
        });
        break;
      case "chooseCity":
        if (cityObj) {
          if (!this.chatData) {
            this.chatData = { city: cityObj, unit: unitType.METRIC };
          } else {
            this.chatData.city = cityObj;
          }
          this.addMessage('bot', `Got it! You want weather for ${cityObj.name}.`);
          this.addMessage('bot', 'Do you prefer Celsius or Fahrenheit?');
          this.chatState = 'askUnit';
        } else {
          this.addMessage('bot', 'Please select a city from the options.');
        }
        break;
      case "askUnit":
        if (this.chatData && this.chatData.city && this.chatData.unit) {
          // After unit selection, go to confirmFetch state
          this.chatState = 'confirmFetch';
          this.addMessage("bot", `Ready to fetch weather for ${this.chatData.city.name} in ${this.chatData.unit === unitType.METRIC ? "Celsius" : "Fahrenheit"}.`);
        } else {
          this.addMessage("bot", "City data is missing. Please select a city first.");
          this.chatState = "askCity";
        }
        break;
      case "confirmFetch":
        if (this.chatData) {
          // Now update the store
          setTimeout(() => {
            if (this.chatData) {
              this.store.dispatch(updateUnit({ unit: this.chatData.unit }));
              this.store.dispatch(updateCity({ city: this.chatData.city }));
            }
          }, 1000);
          this.addMessage("bot", `Fetching weather for ${this.chatData.city.name} in ${this.chatData.unit === unitType.METRIC ? "Celsius" : "Fahrenheit"}...`);
          this.chatState = "fetching";
          this.fetchWeather(this.chatData.city, this.chatData.unit);
        }
        break;
      case "restart":
        this.chatData = { city: { country: '', type: '', key: 0, administrativeArea: '', name: '' }, unit: unitType.METRIC };
        this.chatState = "askCity";
        this.addMessage("bot", "Sure! What's the next city?");
        break;
      default:
        this.addMessage("bot", "Oops, something went wrong.");
        this.chatState = "start";
    }
  }

  // after fetching weather, update the chat state
  fetchWeather(city: citiesModal, unit: string) {
    setTimeout(() => {
      this.addMessage('bot', 'Type "restart" to look for another city.');
      this.chatState = 'restart';
    }, 3000);
  }

  // Method to toggle the collapsed state
  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
