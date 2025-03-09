export interface OWWeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: { main: string; description: string }[];
}
