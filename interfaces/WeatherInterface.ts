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

export interface ICurrentForecast {
  temperature: number;
  high: number;
  low: number;
  pressure: number;
  wind: number;
  humidity: number;
  precipitation: string;
}

export interface IFormatedForecast {
  time: string;
  temperature: number;
  weather: string;
  weatherIcon: string;
}

export interface IFormated3DaysForecast {
  weekDay: WeekDay;
  date: string;
  weather: string;
  weatherIcon: string;
  low: number;
  high: number;
  precipitation: string;
  wind: string;
}

export interface IGroupedFormated3DaysForecast {
  [x: string]: IFormated3DaysForecast;
}

export interface IWeather {
  current: ICurrentForecast;
  forecast: IFormatedForecast[];
  next3Days: IGroupedFormated3DaysForecast;
}
