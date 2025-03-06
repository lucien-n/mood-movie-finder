import { getEnvVariable } from "@/env";
import axios from "axios";
import { MovieGenre, type TMDBMovieResponse } from "common";

export class TMDBService {
  private TMDB_API_KEY: string;

  constructor() {
    this.TMDB_API_KEY = getEnvVariable("TMDB_API_KEY");
  }

  async findManyByGenres(genres: MovieGenre[]): Promise<TMDBMovieResponse[]> {
    const url = "https://api.themoviedb.org/3/discover/movie";
    const params = {
      with_genres: (genres.length >= 2
        ? // two common genres
          [genres.slice(0, 2).join(","), ...genres.slice(2)]
        : genres
      ).join("|"),
    };

    console.log(params);

    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${this.TMDB_API_KEY}`,
      },
    });

    return response.data.results;
  }
}
