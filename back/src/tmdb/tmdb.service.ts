import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ApiErrorCode, MovieGenre, TMDBMovieResponse } from 'common';
import { firstValueFrom } from 'rxjs';
import { ApiError } from 'src/errors/api-error';
import { getEnvVariable } from 'src/helpers/env';

@Injectable()
export class TmdbService {
  API_KEY: string;

  constructor(private readonly httpService: HttpService) {
    this.API_KEY = getEnvVariable('TMDB_API_KEY');
  }

  async findManyByGenres(genres: MovieGenre[]): Promise<TMDBMovieResponse[]> {
    try {
      const url = 'https://api.themoviedb.org/3/discover/movie';
      const params = {
        with_genres: (genres.length >= 2
          ? // two common genres
            [genres.slice(0, 2).join(','), ...genres.slice(2)]
          : genres
        ).join('|'),
      };

      const { data } = await firstValueFrom(
        this.httpService.get(url, {
          params,
          headers: {
            Authorization: `Bearer ${this.API_KEY}`,
          },
        }),
      );

      return data.results;
    } catch (err) {
      throw new ApiError(ApiErrorCode.INTERNAL_ERROR, err);
    }
  }
}
