import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherApiService {

    apiKey = 'UYCWyIoAI1LGtDLUuBGNk5ybKoDPtUVi'
    // apiKey = 'y3cHc0GRaG5qnFWVbKGenOtv4khdhiMx' //mine

    constructor(private http: HttpClient) { }

    getCity(city: string): Observable<any> {
        console.log('getCity called with city:', city);
        // const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${encodeURIComponent(city)}`;
        // return this.http.get(url);
        return of([
            {
                "Version": 1,
                "Key": "206671",
                "Type": "City",
                "Rank": 11,
                "LocalizedName": "Chennai",
                "Country": {
                    "ID": "IN",
                    "LocalizedName": "India"
                },
                "AdministrativeArea": {
                    "ID": "TN",
                    "LocalizedName": "Tamil Nadu"
                }
            },
            {
                "Version": 1,
                "Key": "2842310",
                "Type": "City",
                "Rank": 85,
                "LocalizedName": "Chennaiahgaripalle",
                "Country": {
                    "ID": "IN",
                    "LocalizedName": "India"
                },
                "AdministrativeArea": {
                    "ID": "AP",
                    "LocalizedName": "Andhra Pradesh"
                }
            },
            {
                "Version": 1,
                "Key": "2944547",
                "Type": "City",
                "Rank": 85,
                "LocalizedName": "Chennaiahpeta",
                "Country": {
                    "ID": "IN",
                    "LocalizedName": "India"
                },
                "AdministrativeArea": {
                    "ID": "AP",
                    "LocalizedName": "Andhra Pradesh"
                }
            },
            {
                "Version": 1,
                "Key": "2864642",
                "Type": "City",
                "Rank": 85,
                "LocalizedName": "Chennaithodi",
                "Country": {
                    "ID": "IN",
                    "LocalizedName": "India"
                },
                "AdministrativeArea": {
                    "ID": "KA",
                    "LocalizedName": "Karnataka"
                }
            }
        ])
    }

    getForecastFor5days(cityKey: number, unit: string): Observable<any> {
        console.log('getForecastFor5days called with cityKey:', cityKey, 'and unit:', unit);
        // const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${this.apiKey}&details=true&metric=${unit === 'metric'}`;
        // return this.http.get(url);
        return of({
            "Headline": {
                "EffectiveDate": "2025-07-05T13:00:00+05:30",
                "EffectiveEpochDate": 1751700600,
                "Severity": 5,
                "Text": "A thunderstorm Saturday afternoon",
                "Category": "thunderstorm",
                "EndDate": "2025-07-05T19:00:00+05:30",
                "EndEpochDate": 1751722200,
                "MobileLink": "http://www.accuweather.com/en/in/chennai/206671/daily-weather-forecast/206671?unit=c&lang=en-us",
                "Link": "http://www.accuweather.com/en/in/chennai/206671/daily-weather-forecast/206671?unit=c&lang=en-us"
            },
            "DailyForecasts": [
                {
                    "Date": "2025-07-05T07:00:00+05:30",
                    "EpochDate": 1751679000,
                    "Sun": {
                        "Rise": "2025-07-05T05:47:00+05:30",
                        "EpochRise": 1751674620,
                        "Set": "2025-07-05T18:40:00+05:30",
                        "EpochSet": 1751721000
                    },
                    "Moon": {
                        "Rise": "2025-07-05T14:04:00+05:30",
                        "EpochRise": 1751704440,
                        "Set": "2025-07-06T01:45:00+05:30",
                        "EpochSet": 1751746500,
                        "Phase": "WaxingGibbous",
                        "Age": 10
                    },
                    "Temperature": {
                        "Minimum": {
                            "Value": 28.3,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 36.2,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "RealFeelTemperature": {
                        "Minimum": {
                            "Value": 33.1,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Hot"
                        },
                        "Maximum": {
                            "Value": 41.8,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Dangerous Heat"
                        }
                    },
                    "RealFeelTemperatureShade": {
                        "Minimum": {
                            "Value": 33.1,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Hot"
                        },
                        "Maximum": {
                            "Value": 41,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Very Hot"
                        }
                    },
                    "HoursOfSun": 1,
                    "DegreeDaySummary": {
                        "Heating": {
                            "Value": 0,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Cooling": {
                            "Value": 14,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "AirAndPollen": [
                        {
                            "Name": "AirQuality",
                            "Value": 0,
                            "Category": "Good",
                            "CategoryValue": 1,
                            "Type": "Ozone"
                        },
                        {
                            "Name": "Grass",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Mold",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Ragweed",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Tree",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "UVIndex",
                            "Value": 6,
                            "Category": "High",
                            "CategoryValue": 3
                        }
                    ],
                    "Day": {
                        "Icon": 15,
                        "IconPhrase": "Thunderstorms",
                        "HasPrecipitation": true,
                        "PrecipitationType": "Rain",
                        "PrecipitationIntensity": "Light",
                        "ShortPhrase": "Warm; a stray p.m. t-storm",
                        "LongPhrase": "Breezy this morning; otherwise, cloudy and very warm with widely separated thunderstorms this afternoon",
                        "PrecipitationProbability": 41,
                        "ThunderstormProbability": 25,
                        "RainProbability": 41,
                        "SnowProbability": 0,
                        "IceProbability": 0,
                        "Wind": {
                            "Speed": {
                                "Value": 16.7,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 249,
                                "Localized": "WSW",
                                "English": "WSW"
                            }
                        },
                        "WindGust": {
                            "Speed": {
                                "Value": 40.7,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 239,
                                "Localized": "WSW",
                                "English": "WSW"
                            }
                        },
                        "TotalLiquid": {
                            "Value": 1.3,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Rain": {
                            "Value": 1.3,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Snow": {
                            "Value": 0,
                            "Unit": "cm",
                            "UnitType": 4
                        },
                        "Ice": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "HoursOfPrecipitation": 1,
                        "HoursOfRain": 1,
                        "HoursOfSnow": 0,
                        "HoursOfIce": 0,
                        "CloudCover": 99,
                        "Evapotranspiration": {
                            "Value": 3.3,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "SolarIrradiance": {
                            "Value": 701.5,
                            "Unit": "W/m²",
                            "UnitType": 33
                        },
                        "RelativeHumidity": {
                            "Minimum": 52,
                            "Maximum": 74,
                            "Average": 62
                        },
                        "WetBulbTemperature": {
                            "Minimum": {
                                "Value": 25.5,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 28.4,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 27.3,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        },
                        "WetBulbGlobeTemperature": {
                            "Minimum": {
                                "Value": 26.8,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 31.5,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 29.6,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        }
                    },
                    "Night": {
                        "Icon": 35,
                        "IconPhrase": "Partly cloudy",
                        "HasPrecipitation": false,
                        "ShortPhrase": "Partly cloudy",
                        "LongPhrase": "Partly cloudy",
                        "PrecipitationProbability": 14,
                        "ThunderstormProbability": 3,
                        "RainProbability": 14,
                        "SnowProbability": 0,
                        "IceProbability": 0,
                        "Wind": {
                            "Speed": {
                                "Value": 16.7,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 262,
                                "Localized": "W",
                                "English": "W"
                            }
                        },
                        "WindGust": {
                            "Speed": {
                                "Value": 35.2,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 248,
                                "Localized": "WSW",
                                "English": "WSW"
                            }
                        },
                        "TotalLiquid": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Rain": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Snow": {
                            "Value": 0,
                            "Unit": "cm",
                            "UnitType": 4
                        },
                        "Ice": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "HoursOfPrecipitation": 0,
                        "HoursOfRain": 0,
                        "HoursOfSnow": 0,
                        "HoursOfIce": 0,
                        "CloudCover": 100,
                        "Evapotranspiration": {
                            "Value": 1,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "SolarIrradiance": {
                            "Value": 4.8,
                            "Unit": "W/m²",
                            "UnitType": 33
                        },
                        "RelativeHumidity": {
                            "Minimum": 63,
                            "Maximum": 77,
                            "Average": 73
                        },
                        "WetBulbTemperature": {
                            "Minimum": {
                                "Value": 25.7,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 27.9,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 26.6,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        },
                        "WetBulbGlobeTemperature": {
                            "Minimum": {
                                "Value": 26.8,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 30,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 28,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        }
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/in/chennai/206671/daily-weather-forecast/206671?day=1&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/in/chennai/206671/daily-weather-forecast/206671?day=1&unit=c&lang=en-us"
                },
                {
                    "Date": "2025-07-06T07:00:00+05:30",
                    "EpochDate": 1751765400,
                    "Sun": {
                        "Rise": "2025-07-06T05:48:00+05:30",
                        "EpochRise": 1751761080,
                        "Set": "2025-07-06T18:40:00+05:30",
                        "EpochSet": 1751807400
                    },
                    "Moon": {
                        "Rise": "2025-07-06T14:54:00+05:30",
                        "EpochRise": 1751793840,
                        "Set": "2025-07-07T02:28:00+05:30",
                        "EpochSet": 1751835480,
                        "Phase": "WaxingGibbous",
                        "Age": 11
                    },
                    "Temperature": {
                        "Minimum": {
                            "Value": 27.5,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 36.5,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "RealFeelTemperature": {
                        "Minimum": {
                            "Value": 32.7,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Hot"
                        },
                        "Maximum": {
                            "Value": 40.8,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Very Hot"
                        }
                    },
                    "RealFeelTemperatureShade": {
                        "Minimum": {
                            "Value": 32.7,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Hot"
                        },
                        "Maximum": {
                            "Value": 40.8,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Very Hot"
                        }
                    },
                    "HoursOfSun": 0.9,
                    "DegreeDaySummary": {
                        "Heating": {
                            "Value": 0,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Cooling": {
                            "Value": 14,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "AirAndPollen": [
                        {
                            "Name": "AirQuality",
                            "Value": 0,
                            "Category": "Good",
                            "CategoryValue": 1,
                            "Type": "Ozone"
                        },
                        {
                            "Name": "Grass",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Mold",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Ragweed",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Tree",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "UVIndex",
                            "Value": 5,
                            "Category": "Moderate",
                            "CategoryValue": 2
                        }
                    ],
                    "Day": {
                        "Icon": 7,
                        "IconPhrase": "Cloudy",
                        "HasPrecipitation": false,
                        "ShortPhrase": "Cloudy and very warm",
                        "LongPhrase": "Very warm with a thick cloud cover",
                        "PrecipitationProbability": 25,
                        "ThunderstormProbability": 6,
                        "RainProbability": 25,
                        "SnowProbability": 0,
                        "IceProbability": 0,
                        "Wind": {
                            "Speed": {
                                "Value": 16.7,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 264,
                                "Localized": "W",
                                "English": "W"
                            }
                        },
                        "WindGust": {
                            "Speed": {
                                "Value": 48.2,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 268,
                                "Localized": "W",
                                "English": "W"
                            }
                        },
                        "TotalLiquid": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Rain": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Snow": {
                            "Value": 0,
                            "Unit": "cm",
                            "UnitType": 4
                        },
                        "Ice": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "HoursOfPrecipitation": 0,
                        "HoursOfRain": 0,
                        "HoursOfSnow": 0,
                        "HoursOfIce": 0,
                        "CloudCover": 99,
                        "Evapotranspiration": {
                            "Value": 3.3,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "SolarIrradiance": {
                            "Value": 621,
                            "Unit": "W/m²",
                            "UnitType": 33
                        },
                        "RelativeHumidity": {
                            "Minimum": 49,
                            "Maximum": 77,
                            "Average": 62
                        },
                        "WetBulbTemperature": {
                            "Minimum": {
                                "Value": 25.4,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 28.2,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 26.9,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        },
                        "WetBulbGlobeTemperature": {
                            "Minimum": {
                                "Value": 26.5,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 31.2,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 29.3,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        }
                    },
                    "Night": {
                        "Icon": 42,
                        "IconPhrase": "Mostly cloudy w/ t-storms",
                        "HasPrecipitation": true,
                        "PrecipitationType": "Rain",
                        "PrecipitationIntensity": "Heavy",
                        "ShortPhrase": "An evening thunderstorm",
                        "LongPhrase": "An evening thunderstorm; otherwise, becoming partly cloudy",
                        "PrecipitationProbability": 61,
                        "ThunderstormProbability": 37,
                        "RainProbability": 61,
                        "SnowProbability": 0,
                        "IceProbability": 0,
                        "Wind": {
                            "Speed": {
                                "Value": 14.8,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 247,
                                "Localized": "WSW",
                                "English": "WSW"
                            }
                        },
                        "WindGust": {
                            "Speed": {
                                "Value": 35.2,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 262,
                                "Localized": "W",
                                "English": "W"
                            }
                        },
                        "TotalLiquid": {
                            "Value": 6,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Rain": {
                            "Value": 6,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Snow": {
                            "Value": 0,
                            "Unit": "cm",
                            "UnitType": 4
                        },
                        "Ice": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "HoursOfPrecipitation": 1,
                        "HoursOfRain": 1,
                        "HoursOfSnow": 0,
                        "HoursOfIce": 0,
                        "CloudCover": 99,
                        "Evapotranspiration": {
                            "Value": 0.8,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "SolarIrradiance": {
                            "Value": 4.7,
                            "Unit": "W/m²",
                            "UnitType": 33
                        },
                        "RelativeHumidity": {
                            "Minimum": 70,
                            "Maximum": 79,
                            "Average": 76
                        },
                        "WetBulbTemperature": {
                            "Minimum": {
                                "Value": 25.6,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 28.4,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 26.7,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        },
                        "WetBulbGlobeTemperature": {
                            "Minimum": {
                                "Value": 26.6,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 30.1,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 27.9,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        }
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/in/chennai/206671/daily-weather-forecast/206671?day=2&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/in/chennai/206671/daily-weather-forecast/206671?day=2&unit=c&lang=en-us"
                },
                {
                    "Date": "2025-07-07T07:00:00+05:30",
                    "EpochDate": 1751851800,
                    "Sun": {
                        "Rise": "2025-07-07T05:48:00+05:30",
                        "EpochRise": 1751847480,
                        "Set": "2025-07-07T18:40:00+05:30",
                        "EpochSet": 1751893800
                    },
                    "Moon": {
                        "Rise": "2025-07-07T15:46:00+05:30",
                        "EpochRise": 1751883360,
                        "Set": "2025-07-08T03:15:00+05:30",
                        "EpochSet": 1751924700,
                        "Phase": "WaxingGibbous",
                        "Age": 12
                    },
                    "Temperature": {
                        "Minimum": {
                            "Value": 27.7,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 38.1,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "RealFeelTemperature": {
                        "Minimum": {
                            "Value": 32.7,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Hot"
                        },
                        "Maximum": {
                            "Value": 43.3,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Dangerous Heat"
                        }
                    },
                    "RealFeelTemperatureShade": {
                        "Minimum": {
                            "Value": 32.7,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Hot"
                        },
                        "Maximum": {
                            "Value": 41.7,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Dangerous Heat"
                        }
                    },
                    "HoursOfSun": 0.9,
                    "DegreeDaySummary": {
                        "Heating": {
                            "Value": 0,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Cooling": {
                            "Value": 15,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "AirAndPollen": [
                        {
                            "Name": "AirQuality",
                            "Value": 0,
                            "Category": "Good",
                            "CategoryValue": 1,
                            "Type": "Ozone"
                        },
                        {
                            "Name": "Grass",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Mold",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Ragweed",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Tree",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "UVIndex",
                            "Value": 5,
                            "Category": "Moderate",
                            "CategoryValue": 2
                        }
                    ],
                    "Day": {
                        "Icon": 6,
                        "IconPhrase": "Mostly cloudy",
                        "HasPrecipitation": false,
                        "ShortPhrase": "Rather cloudy and very warm",
                        "LongPhrase": "Rather cloudy and very warm",
                        "PrecipitationProbability": 15,
                        "ThunderstormProbability": 4,
                        "RainProbability": 15,
                        "SnowProbability": 0,
                        "IceProbability": 0,
                        "Wind": {
                            "Speed": {
                                "Value": 16.7,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 230,
                                "Localized": "SW",
                                "English": "SW"
                            }
                        },
                        "WindGust": {
                            "Speed": {
                                "Value": 44.4,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 276,
                                "Localized": "W",
                                "English": "W"
                            }
                        },
                        "TotalLiquid": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Rain": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Snow": {
                            "Value": 0,
                            "Unit": "cm",
                            "UnitType": 4
                        },
                        "Ice": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "HoursOfPrecipitation": 0,
                        "HoursOfRain": 0,
                        "HoursOfSnow": 0,
                        "HoursOfIce": 0,
                        "CloudCover": 100,
                        "Evapotranspiration": {
                            "Value": 3.3,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "SolarIrradiance": {
                            "Value": 430.1,
                            "Unit": "W/m²",
                            "UnitType": 33
                        },
                        "RelativeHumidity": {
                            "Minimum": 45,
                            "Maximum": 81,
                            "Average": 61
                        },
                        "WetBulbTemperature": {
                            "Minimum": {
                                "Value": 25.2,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 28.8,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 27,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        },
                        "WetBulbGlobeTemperature": {
                            "Minimum": {
                                "Value": 26,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 32.3,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 29.4,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        }
                    },
                    "Night": {
                        "Icon": 42,
                        "IconPhrase": "Mostly cloudy w/ t-storms",
                        "HasPrecipitation": true,
                        "PrecipitationType": "Rain",
                        "PrecipitationIntensity": "Moderate",
                        "ShortPhrase": "A thunderstorm or two early",
                        "LongPhrase": "A couple of thunderstorms in the evening; otherwise, becoming partly cloudy",
                        "PrecipitationProbability": 65,
                        "ThunderstormProbability": 39,
                        "RainProbability": 65,
                        "SnowProbability": 0,
                        "IceProbability": 0,
                        "Wind": {
                            "Speed": {
                                "Value": 14.8,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 248,
                                "Localized": "WSW",
                                "English": "WSW"
                            }
                        },
                        "WindGust": {
                            "Speed": {
                                "Value": 35.2,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 272,
                                "Localized": "W",
                                "English": "W"
                            }
                        },
                        "TotalLiquid": {
                            "Value": 1.9,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Rain": {
                            "Value": 1.9,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Snow": {
                            "Value": 0,
                            "Unit": "cm",
                            "UnitType": 4
                        },
                        "Ice": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "HoursOfPrecipitation": 1.5,
                        "HoursOfRain": 1.5,
                        "HoursOfSnow": 0,
                        "HoursOfIce": 0,
                        "CloudCover": 100,
                        "Evapotranspiration": {
                            "Value": 0.8,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "SolarIrradiance": {
                            "Value": 4.7,
                            "Unit": "W/m²",
                            "UnitType": 33
                        },
                        "RelativeHumidity": {
                            "Minimum": 68,
                            "Maximum": 78,
                            "Average": 73
                        },
                        "WetBulbTemperature": {
                            "Minimum": {
                                "Value": 25.6,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 28.6,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 26.9,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        },
                        "WetBulbGlobeTemperature": {
                            "Minimum": {
                                "Value": 26.6,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 30.4,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 28.3,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        }
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/in/chennai/206671/daily-weather-forecast/206671?day=3&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/in/chennai/206671/daily-weather-forecast/206671?day=3&unit=c&lang=en-us"
                },
                {
                    "Date": "2025-07-08T07:00:00+05:30",
                    "EpochDate": 1751938200,
                    "Sun": {
                        "Rise": "2025-07-08T05:48:00+05:30",
                        "EpochRise": 1751933880,
                        "Set": "2025-07-08T18:40:00+05:30",
                        "EpochSet": 1751980200
                    },
                    "Moon": {
                        "Rise": "2025-07-08T16:40:00+05:30",
                        "EpochRise": 1751973000,
                        "Set": "2025-07-09T04:07:00+05:30",
                        "EpochSet": 1752014220,
                        "Phase": "WaxingGibbous",
                        "Age": 13
                    },
                    "Temperature": {
                        "Minimum": {
                            "Value": 27.6,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 37,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "RealFeelTemperature": {
                        "Minimum": {
                            "Value": 32.9,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Hot"
                        },
                        "Maximum": {
                            "Value": 41.5,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Dangerous Heat"
                        }
                    },
                    "RealFeelTemperatureShade": {
                        "Minimum": {
                            "Value": 32.9,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Hot"
                        },
                        "Maximum": {
                            "Value": 41.3,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Very Hot"
                        }
                    },
                    "HoursOfSun": 1.8,
                    "DegreeDaySummary": {
                        "Heating": {
                            "Value": 0,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Cooling": {
                            "Value": 14,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "AirAndPollen": [
                        {
                            "Name": "AirQuality",
                            "Value": 0,
                            "Category": "Good",
                            "CategoryValue": 1,
                            "Type": "Ozone"
                        },
                        {
                            "Name": "Grass",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Mold",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Ragweed",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Tree",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "UVIndex",
                            "Value": 5,
                            "Category": "Moderate",
                            "CategoryValue": 2
                        }
                    ],
                    "Day": {
                        "Icon": 6,
                        "IconPhrase": "Mostly cloudy",
                        "HasPrecipitation": true,
                        "PrecipitationType": "Rain",
                        "PrecipitationIntensity": "Light",
                        "ShortPhrase": "A t-storm around in the p.m.",
                        "LongPhrase": "Mostly cloudy and remaining very warm; a thunderstorm in spots in the afternoon",
                        "PrecipitationProbability": 40,
                        "ThunderstormProbability": 24,
                        "RainProbability": 40,
                        "SnowProbability": 0,
                        "IceProbability": 0,
                        "Wind": {
                            "Speed": {
                                "Value": 14.8,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 277,
                                "Localized": "W",
                                "English": "W"
                            }
                        },
                        "WindGust": {
                            "Speed": {
                                "Value": 40.7,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 283,
                                "Localized": "WNW",
                                "English": "WNW"
                            }
                        },
                        "TotalLiquid": {
                            "Value": 1,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Rain": {
                            "Value": 1,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Snow": {
                            "Value": 0,
                            "Unit": "cm",
                            "UnitType": 4
                        },
                        "Ice": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "HoursOfPrecipitation": 1,
                        "HoursOfRain": 1,
                        "HoursOfSnow": 0,
                        "HoursOfIce": 0,
                        "CloudCover": 92,
                        "Evapotranspiration": {
                            "Value": 3.3,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "SolarIrradiance": {
                            "Value": 996.2,
                            "Unit": "W/m²",
                            "UnitType": 33
                        },
                        "RelativeHumidity": {
                            "Minimum": 47,
                            "Maximum": 81,
                            "Average": 63
                        },
                        "WetBulbTemperature": {
                            "Minimum": {
                                "Value": 25.4,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 28.3,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 27,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        },
                        "WetBulbGlobeTemperature": {
                            "Minimum": {
                                "Value": 26.2,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 31.8,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 29.6,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        }
                    },
                    "Night": {
                        "Icon": 36,
                        "IconPhrase": "Intermittent clouds",
                        "HasPrecipitation": false,
                        "ShortPhrase": "Partly cloudy",
                        "LongPhrase": "Partly cloudy",
                        "PrecipitationProbability": 25,
                        "ThunderstormProbability": 6,
                        "RainProbability": 25,
                        "SnowProbability": 0,
                        "IceProbability": 0,
                        "Wind": {
                            "Speed": {
                                "Value": 13,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 248,
                                "Localized": "WSW",
                                "English": "WSW"
                            }
                        },
                        "WindGust": {
                            "Speed": {
                                "Value": 31.5,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 171,
                                "Localized": "S",
                                "English": "S"
                            }
                        },
                        "TotalLiquid": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Rain": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Snow": {
                            "Value": 0,
                            "Unit": "cm",
                            "UnitType": 4
                        },
                        "Ice": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "HoursOfPrecipitation": 0,
                        "HoursOfRain": 0,
                        "HoursOfSnow": 0,
                        "HoursOfIce": 0,
                        "CloudCover": 64,
                        "Evapotranspiration": {
                            "Value": 0.5,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "SolarIrradiance": {
                            "Value": 86.6,
                            "Unit": "W/m²",
                            "UnitType": 33
                        },
                        "RelativeHumidity": {
                            "Minimum": 72,
                            "Maximum": 79,
                            "Average": 77
                        },
                        "WetBulbTemperature": {
                            "Minimum": {
                                "Value": 25.7,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 28.1,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 26.7,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        },
                        "WetBulbGlobeTemperature": {
                            "Minimum": {
                                "Value": 27.8,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 31.1,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 28.7,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        }
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/in/chennai/206671/daily-weather-forecast/206671?day=4&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/in/chennai/206671/daily-weather-forecast/206671?day=4&unit=c&lang=en-us"
                },
                {
                    "Date": "2025-07-09T07:00:00+05:30",
                    "EpochDate": 1752024600,
                    "Sun": {
                        "Rise": "2025-07-09T05:48:00+05:30",
                        "EpochRise": 1752020280,
                        "Set": "2025-07-09T18:40:00+05:30",
                        "EpochSet": 1752066600
                    },
                    "Moon": {
                        "Rise": "2025-07-09T17:35:00+05:30",
                        "EpochRise": 1752062700,
                        "Set": "2025-07-10T05:02:00+05:30",
                        "EpochSet": 1752103920,
                        "Phase": "WaxingGibbous",
                        "Age": 14
                    },
                    "Temperature": {
                        "Minimum": {
                            "Value": 27.9,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 35.3,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "RealFeelTemperature": {
                        "Minimum": {
                            "Value": 32.6,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Hot"
                        },
                        "Maximum": {
                            "Value": 43.2,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Dangerous Heat"
                        }
                    },
                    "RealFeelTemperatureShade": {
                        "Minimum": {
                            "Value": 32.6,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Hot"
                        },
                        "Maximum": {
                            "Value": 39.6,
                            "Unit": "C",
                            "UnitType": 17,
                            "Phrase": "Very Hot"
                        }
                    },
                    "HoursOfSun": 6.8,
                    "DegreeDaySummary": {
                        "Heating": {
                            "Value": 0,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Cooling": {
                            "Value": 14,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "AirAndPollen": [
                        {
                            "Name": "AirQuality",
                            "Value": 0,
                            "Category": "Good",
                            "CategoryValue": 1,
                            "Type": "Ozone"
                        },
                        {
                            "Name": "Grass",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Mold",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Ragweed",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "Tree",
                            "Value": 0,
                            "Category": "Low",
                            "CategoryValue": 1
                        },
                        {
                            "Name": "UVIndex",
                            "Value": 12,
                            "Category": "Extreme",
                            "CategoryValue": 5
                        }
                    ],
                    "Day": {
                        "Icon": 4,
                        "IconPhrase": "Intermittent clouds",
                        "HasPrecipitation": false,
                        "ShortPhrase": "Times of clouds and sun",
                        "LongPhrase": "Times of clouds and sun",
                        "PrecipitationProbability": 25,
                        "ThunderstormProbability": 6,
                        "RainProbability": 25,
                        "SnowProbability": 0,
                        "IceProbability": 0,
                        "Wind": {
                            "Speed": {
                                "Value": 16.7,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 340,
                                "Localized": "NNW",
                                "English": "NNW"
                            }
                        },
                        "WindGust": {
                            "Speed": {
                                "Value": 38.9,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 139,
                                "Localized": "SE",
                                "English": "SE"
                            }
                        },
                        "TotalLiquid": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Rain": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Snow": {
                            "Value": 0,
                            "Unit": "cm",
                            "UnitType": 4
                        },
                        "Ice": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "HoursOfPrecipitation": 0,
                        "HoursOfRain": 0,
                        "HoursOfSnow": 0,
                        "HoursOfIce": 0,
                        "CloudCover": 50,
                        "Evapotranspiration": {
                            "Value": 4.6,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "SolarIrradiance": {
                            "Value": 7268.5,
                            "Unit": "W/m²",
                            "UnitType": 33
                        },
                        "RelativeHumidity": {
                            "Minimum": 54,
                            "Maximum": 82,
                            "Average": 67
                        },
                        "WetBulbTemperature": {
                            "Minimum": {
                                "Value": 25.5,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 28.2,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 27,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        },
                        "WetBulbGlobeTemperature": {
                            "Minimum": {
                                "Value": 27.1,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 32.3,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 29.9,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        }
                    },
                    "Night": {
                        "Icon": 35,
                        "IconPhrase": "Partly cloudy",
                        "HasPrecipitation": false,
                        "ShortPhrase": "Partly cloudy",
                        "LongPhrase": "Partly cloudy",
                        "PrecipitationProbability": 23,
                        "ThunderstormProbability": 6,
                        "RainProbability": 23,
                        "SnowProbability": 0,
                        "IceProbability": 0,
                        "Wind": {
                            "Speed": {
                                "Value": 14.8,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 207,
                                "Localized": "SSW",
                                "English": "SSW"
                            }
                        },
                        "WindGust": {
                            "Speed": {
                                "Value": 35.2,
                                "Unit": "km/h",
                                "UnitType": 7
                            },
                            "Direction": {
                                "Degrees": 147,
                                "Localized": "SSE",
                                "English": "SSE"
                            }
                        },
                        "TotalLiquid": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Rain": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "Snow": {
                            "Value": 0,
                            "Unit": "cm",
                            "UnitType": 4
                        },
                        "Ice": {
                            "Value": 0,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "HoursOfPrecipitation": 0,
                        "HoursOfRain": 0,
                        "HoursOfSnow": 0,
                        "HoursOfIce": 0,
                        "CloudCover": 36,
                        "Evapotranspiration": {
                            "Value": 0.5,
                            "Unit": "mm",
                            "UnitType": 3
                        },
                        "SolarIrradiance": {
                            "Value": 76,
                            "Unit": "W/m²",
                            "UnitType": 33
                        },
                        "RelativeHumidity": {
                            "Minimum": 80,
                            "Maximum": 84,
                            "Average": 83
                        },
                        "WetBulbTemperature": {
                            "Minimum": {
                                "Value": 25.6,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 28,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 26.6,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        },
                        "WetBulbGlobeTemperature": {
                            "Minimum": {
                                "Value": 27.6,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Maximum": {
                                "Value": 29.7,
                                "Unit": "C",
                                "UnitType": 17
                            },
                            "Average": {
                                "Value": 28.6,
                                "Unit": "C",
                                "UnitType": 17
                            }
                        }
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/in/chennai/206671/daily-weather-forecast/206671?day=5&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/in/chennai/206671/daily-weather-forecast/206671?day=5&unit=c&lang=en-us"
                }
            ]
        })
    }

    getGeoLocation(cityKey: number): Observable<any> {
        console.log('getGeoLocation called with cityKey:', cityKey);
        // const url = `http://dataservice.accuweather.com/locations/v1/${cityKey}?apikey=${this.apiKey}`; // Replace with actual geolocation API URL
        // return this.http.get(url);
        return of(
            {
                "Version": 1,
                "Key": "206671",
                "Type": "City",
                "Rank": 11,
                "LocalizedName": "Chennai",
                "EnglishName": "Chennai",
                "PrimaryPostalCode": "",
                "Region": {
                    "ID": "ASI",
                    "LocalizedName": "Asia",
                    "EnglishName": "Asia"
                },
                "Country": {
                    "ID": "IN",
                    "LocalizedName": "India",
                    "EnglishName": "India"
                },
                "AdministrativeArea": {
                    "ID": "TN",
                    "LocalizedName": "Tamil Nadu",
                    "EnglishName": "Tamil Nadu",
                    "Level": 1,
                    "LocalizedType": "State",
                    "EnglishType": "State",
                    "CountryID": "IN"
                },
                "TimeZone": {
                    "Code": "IST",
                    "Name": "Asia/Kolkata",
                    "GmtOffset": 5.5,
                    "IsDaylightSaving": false,
                    "NextOffsetChange": null
                },
                "GeoPosition": {
                    "Latitude": 13.0878 + Math.random() * 10, // Simulating slight variation
                    "Longitude": 80.245 + Math.random() * 10, // Simulating slight variation
                    "Elevation": {
                        "Metric": {
                            "Value": 17,
                            "Unit": "m",
                            "UnitType": 5
                        },
                        "Imperial": {
                            "Value": 55,
                            "Unit": "ft",
                            "UnitType": 0
                        }
                    }
                },
                "IsAlias": false,
                "SupplementalAdminAreas": [
                    {
                        "Level": 2,
                        "LocalizedName": "Chennai",
                        "EnglishName": "Chennai"
                    }
                ],
                "DataSets": [
                    "AirQualityCurrentConditions",
                    "AirQualityForecasts",
                    "Alerts",
                    "FutureRadar",
                    "MinuteCast",
                    "PremiumAirQuality",
                    "TidalForecast"
                ]
            }
        );
    }

    getReverseGeoLocation(latitude: number, longitude: number): Observable<any> {
        console.log('getReverseGeoLocation called with latitude:', latitude, 'and longitude:', longitude);
        // const url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${latitude},${longitude}`;
        // return this.http.get(url);
        return of({
            "Version": 1,
            "Key": "206671",
            "Type": "City",
            "Rank": 11,
            "LocalizedName": "Tokyo",
            "EnglishName": "Tokyo",
            "PrimaryPostalCode": "",
            "Region": {
                "ID": "ASI",
                "LocalizedName": "Asia",
                "EnglishName": "Asia"
            },
            "Country": {
                "ID": "IN",
                "LocalizedName": "India",
                "EnglishName": "India"
            },
            "AdministrativeArea": {
                "ID": "TN",
                "LocalizedName": "Tamil Nadu",
                "EnglishName": "Tamil Nadu",
                "Level": 1,
                "LocalizedType": "State",
                "EnglishType": "State",
                "CountryID": "IN"
            },
            "TimeZone": {
                "Code": "IST",
                "Name": "Asia/Kolkata",
                "GmtOffset": 5.5,
                "IsDaylightSaving": false,
                "NextOffsetChange": null
            },
            "GeoPosition": {
                "Latitude": 13.038,
                "Longitude": 80.245,
                "Elevation": {
                    "Metric": {
                        "Value": 17,
                        "Unit": "m",
                        "UnitType": 5
                    },
                    "Imperial": {
                        "Value": 55,
                        "Unit": "ft",
                        "UnitType": 0
                    }
                }
            },
            "IsAlias": false,
            "SupplementalAdminAreas": [
                {
                    "Level": 2,
                    "LocalizedName": "Chennai",
                    "EnglishName": "Chennai"
                }
            ],
            "DataSets": [
                "AirQualityCurrentConditions",
                "AirQualityForecasts",
                "Alerts",
                "FutureRadar",
                "MinuteCast",
                "PremiumAirQuality",
                "TidalForecast"
            ]
        });
    }
}
