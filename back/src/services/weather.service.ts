import { cacher } from "@/cacher";
import { getEnvVariable } from "@/env";
import axios from "axios";
import {
  isWeatherCondition,
  WeatherCondition,
  type OWMWeatherResponse,
} from "common";

export class WeatherService {
  private OPENWEATHER_API_KEY: string;

  constructor() {
    this.OPENWEATHER_API_KEY = getEnvVariable("OPENWEATHER_API_KEY");
  }

  async findWeatherConditionByCity(city: string): Promise<WeatherCondition> {
    const cachedWeatherCondition = cacher.get(city);
    if (cachedWeatherCondition && isWeatherCondition(cachedWeatherCondition))
      return cachedWeatherCondition;

    const url = "https://api.openweathermap.org/data/2.5/weather";
    const params = {
      appid: this.OPENWEATHER_API_KEY,
      q: city,
      units: "metric",
    };

    const response = await axios.get<OWMWeatherResponse>(url, { params });

    const weatherCondition = response.data.weather.flatMap(({ description }) =>
      isWeatherCondition(description) ? description : []
    )[0];

    cacher.set(city, weatherCondition, 1000 * 60 * 30); // cache weather condition for 30 minutes

    return weatherCondition;
  }
}
