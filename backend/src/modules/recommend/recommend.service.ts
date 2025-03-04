import { WEATHER_GENRE, WeatherCondition } from "@/types";
import { TMDBService } from "../tmdb/tmdb.service";
import { WeatherService } from "../weather/weather.service";
import { Movie } from "common";

export class RecommendService {
  constructor(
    private readonly tmdbService: TMDBService,
    private readonly weatherService: WeatherService
  ) {}

  async findManyByCity(city: string): Promise<Movie[]> {
    const [weatherCondition] = await this.weatherService.findWeatherByCity(
      city
    );

    const movies = await this.tmdbService.findManyByGenre(
      WEATHER_GENRE[weatherCondition]
    );

    return movies;
  }
}
