import { WeatherCondition } from ".";

export const isWeatherCondition = (str: string): str is WeatherCondition =>
  Object.values(WeatherCondition).some((condition) => condition === str);
