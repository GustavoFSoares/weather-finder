export const WeekDaysList = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
] as const;
export type WeekDay = (typeof WeekDaysList)[number];

export interface IWeatherItem {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  pop: number;
  sys: any;
  dt_txt: string;
}

export interface IWeatherItemWithTime extends IWeatherItem {
  date: string;
  time: string;
  weekDay: WeekDay;
}

export interface IGroupedWeatherForecast {
  [key: string]: IWeatherItemWithTime[];
}

export interface ICurrentWeatherResponse extends IWeatherItem {
  coord: {
    lon: number;
    lat: number;
  };
  base: string;
  timezone: number;
  id: number;
  name: string;
  cod: string;
}

export interface IForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: IWeatherItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
