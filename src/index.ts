import axios from "axios";
import { WeatherResponse } from "./types";
import { getEnvVariable } from "./env";

const OPENWEATHER_API_KEY = getEnvVariable("OPENWEATHER_API_KEY");

const getWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  const url = "https://api.openweathermap.org/data/2.5/weather";
  const params = {
    appid: OPENWEATHER_API_KEY,
    q: city,
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

const main = async () => {
  try {
    const weather = await getWeatherByCity("Paris");

    console.log(weather);
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

main();
