export interface DayForecast {
  date: string;
  minTemp: number;
  maxTemp: number;
  tempUnit: string; 
  minRealFeel: number;
  maxRealFeel: number;
  dayPhrase: string;
  nightPhrase: string;
  dayShort: string;
  nightShort: string;
  windDay: {
    speed: number;
    unit: string;
    direction: string;
  };
  windNight: {
    speed: number;
    unit: string;
    direction: string;
  };
  humidityDay: any;
  humidityNight: any;
  headLine?: string
}


export interface geoLocation{
  latitude: number;
  longitude: number;
}