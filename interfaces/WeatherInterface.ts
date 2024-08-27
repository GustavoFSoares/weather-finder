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
export enum WeekDayDescription {
  "sun" = "Sunday",
  "mon" = "Monday",
  "tue" = "Tuesday",
  "wed" = "Wednesday",
  "thu" = "Thursday",
  "fri" = "Friday",
  "sat" = "Saturday",
}

export const MonthsDescription = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
} as const;
export type MonthsNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ICurrentForecast {
  city: string;
  date: string;
  weather: string;
  weatherIcon: string;
  weatherDescrition: string;
  weekDay: WeekDay;
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
