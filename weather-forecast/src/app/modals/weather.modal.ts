export interface DayForecast {
  date: string;
  minTemp: number;
  maxTemp: number;
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
}
