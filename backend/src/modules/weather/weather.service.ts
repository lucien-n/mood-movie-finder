import axios from "axios";
import { getEnvVariable } from "@/env";
import { Weather } from "common";

export class WeatherService {
  private OPENWEATHER_API_KEY: string;

  constructor() {
    this.OPENWEATHER_API_KEY = getEnvVariable("OPENWEATHER_API_KEY");
  }

  async findWeatherByCity(city: string): Promise<Weather> {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const params = {
      appid: this.OPENWEATHER_API_KEY,
      q: city,
      units: "metric",
    };

    try {
      const response = await axios.get(url, { params });
      const data = response.data;

      return {
        main: {
          temp: data.main.temp,
          humidity: data.main.humidity,
        },
        weather: data.weather.map((w: any) => ({
          main: w.main,
          description: w.description,
        })),
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);

      throw error;
    }
  }
}
