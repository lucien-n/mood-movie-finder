import { getEnvVariable } from "@/env";
import axios from "axios";
import { MovieGenre, type TMDBMovieResponse } from "common";

export class TMDBService {
  private TMDB_API_KEY: string;

  constructor() {
    this.TMDB_API_KEY = getEnvVariable("TMDB_API_KEY");
  }

  async findManyByGenre(genre: MovieGenre): Promise<TMDBMovieResponse[]> {
    const url = "https://api.themoviedb.org/3/discover/movie";
    const params = {
      with_genres: genre,
    };

    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${this.TMDB_API_KEY}`,
      },
    });

    return response.data.results;
  }
}
