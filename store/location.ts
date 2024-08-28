import { defineStore } from "pinia";
import type {
  ICurrentForecast,
  IFormatedForecast,
  IGroupedFormated3DaysForecast,
  IWeather,
} from "~/interfaces/WeatherInterface";

export const useLocationStore = defineStore({
  id: "locations",
  state: () => ({
    loading: false,
    currentWeatherData: {} as ICurrentForecast,
    forecastData: [] as IFormatedForecast[],
    next3DaysData: {} as IGroupedFormated3DaysForecast,
  }),
  getters: {
    currentWeather: (state) => state.currentWeatherData,
    forecast: (state) => state.forecastData,
    next3Days: (state) => state.next3DaysData,
  },
  actions: {
    storeWeather(weather: IWeather | null) {
      if (!weather) {
        return null;
      }

      this.currentWeatherData = weather.current;
      this.forecastData = weather.forecast;
      this.next3DaysData = weather.next3Days;
    },
  },
});
