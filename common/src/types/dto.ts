import { Movie, WeatherCondition } from "@/types";

export interface RecommendResponse {
  weatherCondition: WeatherCondition;
  movies: Movie[];
}
