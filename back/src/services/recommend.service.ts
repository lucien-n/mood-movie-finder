import {
  Movie,
  MovieGenre,
  getGenresForWeather,
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
    const weatherCondition =
      await this.weatherService.findWeatherConditionByCity(city);

    const movies = await this.tmdbService.findManyByGenres(
      getGenresForWeather(weatherCondition)
    );

    return {
      weatherCondition,
      movies: movies.map(
        (m) =>
          ({
            id: m.id,
            title: m.title,
            overview: m.overview,
            rating: Math.round(m.vote_average * 5) / 10,
            posterPath: m.poster_path,
            genres: Object.values(MovieGenre).filter(
              (value): value is MovieGenre =>
                typeof value === "number" && m.genre_ids.includes(value)
            ),
            releaseDate: new Date(m.release_date),
          }) satisfies Movie
      ),
    };
  }
}
