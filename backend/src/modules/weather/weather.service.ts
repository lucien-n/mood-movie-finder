import { getEnvVariable } from "@/env";
import { isWeatherCondition, WeatherCondition } from "@/types";
import axios from "axios";

interface WeatherResponse {
  weather: { description: string }[];
}

export class WeatherService {
  private OPENWEATHER_API_KEY: string;

  constructor() {
    this.OPENWEATHER_API_KEY = getEnvVariable("OPENWEATHER_API_KEY");
  }

  async findWeatherByCity(city: string): Promise<WeatherCondition[]> {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const params = {
      appid: this.OPENWEATHER_API_KEY,
      q: city,
      units: "metric",
    };

    try {
      const response = await axios.get<WeatherResponse>(url, { params });
      const data = response.data;

      return data.weather.flatMap(({ description }) =>
        isWeatherCondition(description) ? description : []
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);

      throw error;
    }
  }
}
