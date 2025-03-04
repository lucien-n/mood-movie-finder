import { getEnvVariable } from "@/env";
import { MovieGenre } from "@/types";
import axios from "axios";

export class TMDBService {
  private TMDB_API_KEY: string;

  constructor() {
    this.TMDB_API_KEY = getEnvVariable("TMDB_API_KEY");
  }

  async findManyByGenre(genre: MovieGenre) {
    const url = "https://api.themoviedb.org/3/discover/movie";
    const params = {
      with_genres: genre,
    };

    try {
      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${this.TMDB_API_KEY}`,
        },
      });
      const data = response.data;

      return data.results.map((m: any) => ({
        id: m.id,
        title: m.title,
        overview: m.overview,
        posterPath: m.poster_path,
        // from x/10 to x/5 rounded to first decimal
        rating: Math.round(m.vote_average * 5) / 10,
      }));
    } catch (error) {
      console.error("Error fetching weather data:", error);

      throw error;
    }
  }
}
