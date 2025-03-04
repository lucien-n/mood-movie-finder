import { getEnvVariable } from "@/env";
import axios from "axios";
import type { OWMWeatherResponse } from "common";

export class WeatherService {
  private OPENWEATHER_API_KEY: string;

  constructor() {
    this.OPENWEATHER_API_KEY = getEnvVariable("OPENWEATHER_API_KEY");
  }

  async findWeatherByCity(city: string): Promise<OWMWeatherResponse> {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const params = {
      appid: this.OPENWEATHER_API_KEY,
      q: city,
      units: "metric",
    };

    try {
      const response = await axios.get<OWMWeatherResponse>(url, { params });
      const data = response.data;

      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);

      throw error;
    }
  }
}
