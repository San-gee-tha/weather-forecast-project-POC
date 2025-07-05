
export enum  unitType {
  METRIC = 'metric', // Celsius
  IMPERIAL = 'imperial' // Fahrenheit
}

export class citiesModal {
    "key": number
    "type": string
    "name": string
    "country": string
    "administrativeArea": string
}

export interface dateModal{
  day: string;
  month: string;
  dayNumber: number;
} 