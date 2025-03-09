import { Injectable } from '@nestjs/common';
import {
  RecommendResponse,
  MovieGenre,
  Movie,
  weatherToGenresMappings,
} from 'common';
import { OpenWeatherService } from 'src/open-weather/open-weather.service';
import { TmdbService } from 'src/tmdb/tmdb.service';

@Injectable()
export class RecommendService {
  constructor(
    private readonly tmdbService: TmdbService,
    private readonly weatherService: OpenWeatherService,
  ) {}

  async findManyByCity(city: string): Promise<RecommendResponse> {
    const weatherCondition =
      await this.weatherService.findWeatherConditionByCity(city);

    const movies = await this.tmdbService.findManyByGenres(
      weatherToGenresMappings(weatherCondition),
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
                typeof value === 'number' && m.genre_ids.includes(value),
            ),
            releaseDate: m.release_date,
          }) satisfies Movie,
      ),
    };
  }
}
