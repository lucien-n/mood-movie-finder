import { Movie, WeatherCondition } from "@/types";

export interface RecommendResponse {
  weather: WeatherCondition;
  movies: Movie[];
}
