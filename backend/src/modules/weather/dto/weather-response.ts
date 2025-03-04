export default interface WeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: { main: string; description: string }[];
}
