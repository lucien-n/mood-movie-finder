import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ApiErrorCode, MovieGenre, TMDBMovieResponse } from 'common';
import { ApiError } from 'src/errors/api-error';
import { getEnvVariable } from 'src/helpers/env';

@Injectable()
export class TmdbService {
  API_KEY: string;

  constructor() {
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

      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
        },
      });

      return response.data.results;
    } catch (err) {
      throw new ApiError(ApiErrorCode.INTERNAL_ERROR, err);
    }
  }
}
