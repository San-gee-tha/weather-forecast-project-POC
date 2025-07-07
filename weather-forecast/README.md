# Weather Forecast Angular Application

# Demo url https://weather-forecast-poc.web.app

## Features
- Client-side rendered Angular 19+ application
- Weather forecast, city search, map integration (Mapbox), and chatbot
- State management with NgRx
- Material UI feedback (snackbar, autocomplete)

## Prerequisites
- Node.js (v22)
- npm (v9 or newer recommended)
- Mapbox API key (see `src/app/api-keys.ts`)
- AccuWeather API key (see `src/app/api-keys.ts`)
- Angular 19 cli

## Setup
1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure API Keys:**
   - Edit `src/app/api-keys.ts` and set your Mapbox and AccuWeather API keys.

3. **Run the application locally:**
   - Start the development server:
     ```sh
     npm start
     ```
   - Open your browser and go to [http://localhost:4200](http://localhost:4200)

4. **Build for production:**
   ```sh
   npm run build
   ```
   - The production build output will be in `dist/weather-forecast/browser`.

5. **Deploy to Firebase Hosting:**
   - Make sure Firebase CLI is installed and initialized.
   - Run:
     ```sh
     firebase deploy --only hosting
     ```

## Notes
- This app is **client-side rendered** (CSR). No server-side rendering is used.
- For map features, ensure your Mapbox key is valid and has the correct permissions.
- For weather data, ensure your AccuWeather key is valid and has API access.

## Troubleshooting
- If you see errors about missing API keys, check `src/app/api-keys.ts`.
- If map is not loading, check browser console for Mapbox errors and verify your key.
- For Material UI issues, ensure `@angular/material` and `@angular/animations` are installed.

## Testing
- Run unit tests with:
  ```sh
  npm test
  ```

## Project Structure
- `src/app/` — Main Angular app code
- `src/app/map/` — Map component (Mapbox integration)
- `src/app/state/` — NgRx state management
- `src/app/weather-api.service.ts` — Weather API integration
- `src/app/api-keys.ts` — API keys (do not commit real secrets)

---
For further help, see the README.md or contact the project maintainer.


---------------------------------------------------------------------------------------------------
### Application Usage Documentation: Weather Dashboard with Interactive Map and Chatbot Integration


## **Introduction**

The Weather Dashboard application allows users to interactively search for current weather conditions in any city, view detailed forecasts, and access relevant data such as temperature (in Celsius or Fahrenheit), humidity, wind speed, and a 3-day weather forecast in graphical format. The application also includes a dynamic map for visual location selection and a chatbot for easy city and unit selection.

---

## **Features Overview**

1. **City Search and Weather Display**

   * Users can enter a city name into a search field.
   * A dropdown will populate with city and country options.
   * Upon selecting a city, the current weather conditions for the city will be displayed (temperature, humidity, wind speed, etc.).
   * A 3-day weather forecast is shown below the weather details in a chart.

2. **Interactive Map**

   * A map of the selected city is displayed on the dashboard.
   * Users can zoom in and out of the map for a closer view.
   * When a user clicks on any city in the map, the dashboard will automatically update with the weather details and forecast for the selected city.

3. **Unit Selection**

   * A toggle option allows users to switch between Celsius and Fahrenheit units for temperature.
   * The unit selection is used to fetch and display weather data in the selected unit of measurement.

4. **Chatbot Integration**

   * The chatbot prompts users to enter a city name.
   * As the user types the city, suggestions with city and country names appear as buttons.
   * The user can click on the button of the correct city.
   * A prompt to select a unit (Celsius or Fahrenheit) is shown.
   * The weather data for the selected city and unit is displayed on the dashboard.

---

 **Real-Time Updates**: Weather data and forecast information is fetched in real-time from weather APIs. Therefore, the displayed data will be accurate as per the most recent update available.
* **Map Interaction**: The map feature uses an interactive map that supports zooming and panning for better city selection. Clicking on any city on the map will automatically update the dashboard with the selected city’s weather data.
* **Unit Switching**: Changing the unit for temperature will trigger an automatic update in both the displayed current temperature and the forecast chart.

---

## **Troubleshooting**

* **City Not Found**: If the city name you entered does not appear in the dropdown or suggestions, ensure that the name is spelled correctly. Some cities may have similar names, so ensure the country name is correct as well.
* **Weather Data Not Updating**: If the weather data does not update after selecting a city or changing the unit, try refreshing the page or clearing your browser cache.
* **Map Not Displaying Properly**: Ensure that your internet connection is stable, as the map requires an active connection to load the map tiles and data.

---
