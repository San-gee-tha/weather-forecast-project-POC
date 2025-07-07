# Weather Forecast Angular Application

## Features
- Client-side rendered Angular 19+ application
- Weather forecast, city search, map integration (Mapbox), and chatbot
- State management with NgRx
- Material UI feedback (snackbar, autocomplete)

## Prerequisites
- Node.js (v18 or newer recommended)
- npm (v9 or newer recommended)
- Mapbox API key (see `src/app/api-keys.ts`)
- AccuWeather API key (see `src/app/api-keys.ts`)

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


