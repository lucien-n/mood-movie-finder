import axios from "axios";
import { getEnvVariable } from "@/env";
import type { Movie } from "common";

export class TmdbService {
  private TMDB_API_KEY: string;

  constructor() {
    this.TMDB_API_KEY = getEnvVariable("TMDB_API_KEY");
  }

  async findManyByName(name: string): Promise<Movie[]> {
    const url = "https://api.themoviedb.org/3/search/movie";
    const params = {
      query: name,
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
        title: m.title,
        overview: m.overview,
      }));
    } catch (error) {
      console.error("Error fetching weather data:", error);

      throw error;
    }
  }

  async findManyByGenre(genre: string) {
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
        title: m.title,
        overview: m.overview,
      }));
    } catch (error) {
      console.error("Error fetching weather data:", error);

      throw error;
    }
  }
}
