import axios from "axios";
import { getEnvVariable } from "@/env";
import WeatherResponse from "./dto/weather-response";

const OPENWEATHER_API_KEY = getEnvVariable("OPENWEATHER_API_KEY");

export default () => {
  const findWeatherByCity = async (city: string): Promise<WeatherResponse> => {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const params = {
      appid: OPENWEATHER_API_KEY,
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
  };

  return {
    findWeatherByCity,
  };
};
