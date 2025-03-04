import {
  isWeatherCondition,
  Movie,
  WEATHER_MOVIE_GENRE,
  type RecommendResponse,
} from "common";
import { TMDBService } from "./tmdb.service";
import { WeatherService } from "./weather.service";

export class RecommendService {
  constructor(
    private readonly tmdbService: TMDBService,
    private readonly weatherService: WeatherService
  ) {}

  async findManyByCity(city: string): Promise<RecommendResponse> {
    const weather = await this.weatherService.findWeatherByCity(city);

    const [weatherCondition] = weather.weather.flatMap(({ description }) =>
      isWeatherCondition(description) ? description : []
    );

    const movies = await this.tmdbService.findManyByGenre(
      WEATHER_MOVIE_GENRE[weatherCondition]
    );

    return {
      weather: weatherCondition,
      movies: movies.map(
        (m) =>
          ({
            id: m.id,
            title: m.title,
            overview: m.overview,
            rating: Math.round(m.vote_average * 5) / 10,
            posterPath: m.poster_path,
          } satisfies Movie)
      ),
    };
  }
}
