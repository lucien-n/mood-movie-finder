export interface OWMWeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: { main: string; description: string }[];
}
