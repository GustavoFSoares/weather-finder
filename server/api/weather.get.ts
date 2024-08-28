import {
  ICurrentForecast,
  IFormatedForecast,
  IGroupedFormated3DaysForecast,
  IWeather,
  MonthsDescription,
  MonthsNumber,
  WeekDaysList,
} from "~/interfaces/WeatherInterface";
import {
  ICurrentWeatherResponse,
  IForecastResponse,
  IGroupedWeatherForecast,
  IWeatherItemWithTime,
} from "../interfaces/WeatherInterface";

const NEXT_DAYS_TIME_TARGET = "09:00";
const MPH_MULTILER = 2.236936;

function normalizedWeather(weather?: string) {
  if (!weather) {
    return "?";
  }

  return weather.replace(/\s/, "-").toLocaleLowerCase();
}

function normalizeTemperature(
  temperature: number,
  main: boolean = false
): number {
  if (main) {
    return Number(temperature.toFixed(0));
  }

  return Number(temperature.toFixed(1));
}

function getCurrentWeather(
  currentWeather: ICurrentWeatherResponse
): ICurrentForecast {
  const date = new Date(currentWeather.dt * 1000);

  const weekDay = WeekDaysList[date.getDay()];
  const day = date.getDate();

  const monthNumber = date.getMonth() as MonthsNumber;
  const month = MonthsDescription[monthNumber] as string;

  return {
    city: `${currentWeather.name}, ${currentWeather.sys.country} `,
    weekDay,
    date: `${day} ${month}`,
    weather: normalizedWeather(currentWeather.weather[0]?.main),
    weatherIcon: currentWeather.weather[0]?.icon || "?",
    weatherDescrition: currentWeather.weather[0]?.description || "?",
    temperature: normalizeTemperature(currentWeather.main.temp, true),
    high: normalizeTemperature(currentWeather.main.temp_max),
    low: normalizeTemperature(currentWeather.main.temp_min),
    pressure: currentWeather.main.pressure,
    wind: currentWeather.wind.speed,
    humidity: currentWeather.main.humidity,
    precipitation: "N/A",
  };
}

function getCurrentForecast(
  groupedForecast: IGroupedWeatherForecast
): IWeatherItemWithTime[] {
  const currentDay = new Date().toLocaleDateString();

  const currentForecastIndex = Object.keys(groupedForecast).find(
    (date) => currentDay === date
  );

  if (!currentForecastIndex) {
    return [];
  }

  return groupedForecast[currentForecastIndex];
}

function formatCurrentForecast(
  currentForecast: IWeatherItemWithTime[]
): IFormatedForecast[] {
  const formatedForecast = currentForecast.map((item) => {
    return {
      time: item.time,
      temperature: normalizeTemperature(item.main.temp),
      weather: normalizedWeather(item.weather[0]?.main),
      weatherIcon: item.weather[0]?.icon || "?",
    };
  });

  return formatedForecast;
}

function getNext3daysForecast(
  groupedForecast: IGroupedWeatherForecast
): IGroupedWeatherForecast {
  const currentDate = new Date();

  const currentDay = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const [plus1, plus2, plus3] = Object.keys(groupedForecast).filter(
    (itemDate) => {
      return (
        `${month}/${currentDay + 1}/${year}` === itemDate ||
        `${month}/${currentDay + 2}/${year}` === itemDate ||
        `${month}/${currentDay + 3}/${year}` === itemDate
      );
    }
  );

  return {
    [plus1]: groupedForecast[plus1],
    [plus2]: groupedForecast[plus2],
    [plus3]: groupedForecast[plus3],
  };
}

function formatNext3daysForecast(
  next3daysForecast: IGroupedWeatherForecast
): IGroupedFormated3DaysForecast {
  const formattedNext3Days = Object.values(
    next3daysForecast
  ).reduce<IGroupedFormated3DaysForecast>((amount, item, itemIndex) => {
    const weatherDayTarget = item.find((item) => {
      return item.time === NEXT_DAYS_TIME_TARGET;
    });

    if (!weatherDayTarget) {
      throw new Error(
        `Error trying to get weather day target to index: ${itemIndex}`
      );
    }

    amount[weatherDayTarget.date] = {
      weekDay: weatherDayTarget.weekDay,
      date: weatherDayTarget.date,
      weather: normalizedWeather(weatherDayTarget.weather[0]?.main),
      weatherIcon: weatherDayTarget.weather[0]?.icon || "?",
      low: normalizeTemperature(weatherDayTarget.main.temp_min),
      high: normalizeTemperature(weatherDayTarget.main.temp_max),
      precipitation: "N/A",
      wind: `${(weatherDayTarget.wind.speed * MPH_MULTILER).toFixed(1)}mph`,
    };

    return amount;
  }, {} as IGroupedFormated3DaysForecast);

  return formattedNext3Days;
}

export default defineEventHandler(async (event) => {
  const { weatherApi, weatherApiKey } = useRuntimeConfig();

  const { latlon } = getQuery<{ latlon?: string }>(event);

  if (!latlon) {
    return null;
  }

  const [lat, lon] = latlon.split(",");

  const params = {
    lat: lat,
    lon: lon,
    units: "metric",
    appid: weatherApiKey,
  };

  try {
    const currentDataRequest = $fetch<ICurrentWeatherResponse>(
      `${weatherApi}/data/2.5/weather`,
      {
        params,
      }
    );

    const forecastDataRequest = $fetch<IForecastResponse>(
      `${weatherApi}/data/2.5/forecast`,
      {
        params,
      }
    );

    const [currentData, forecastData] = await Promise.all([
      currentDataRequest,
      forecastDataRequest,
    ]);

    const grupedForecast = forecastData.list.reduce<IGroupedWeatherForecast>(
      (amount, item) => {
        const date = new Date(item.dt * 1000);

        const currentDay = date.toLocaleDateString();
        if (!amount[currentDay]) {
          amount[currentDay] = [];
        }

        const hour = `${date.getHours()}`.padStart(2, "0");
        const minute = `${date.getMinutes()}`.padStart(2, "0");
        const weekDay = WeekDaysList[date.getDay()];

        const itemWithTim: IWeatherItemWithTime = {
          ...item,
          date: currentDay,
          time: `${hour}:${minute}`,
          weekDay,
        };

        amount[currentDay].push(itemWithTim);

        return amount;
      },
      {} as IGroupedWeatherForecast
    );

    const currentWeather = getCurrentWeather(currentData);

    const currentForecast = getCurrentForecast(grupedForecast);
    const formattedCurrentForecast = formatCurrentForecast(currentForecast);

    const next3DaysForecast = getNext3daysForecast(grupedForecast);
    const formattedNext3DaysForecast =
      formatNext3daysForecast(next3DaysForecast);

    const weatherData: IWeather = {
      current: currentWeather,
      forecast: formattedCurrentForecast,
      next3Days: formattedNext3DaysForecast,
    };

    return weatherData;
  } catch (err) {
    if (Array.isArray(err)) {
      console.error(err);
      throw new Error("Error trying to request data");
    }

    console.error(err);
    throw new Error("Error during format data");
  }
});
