import axios from "axios";
import { getEnvVariable } from "@/env";
import type { Genre, Movie } from "common";
import { MovieGenre } from "@/types";

export class TMDBService {
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
      }));
    } catch (error) {
      console.error("Error fetching weather data:", error);

      throw error;
    }
  }

  async findManyGenre(): Promise<Genre[]> {
    const url = "https://api.themoviedb.org/3/genre/movie/list";

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.TMDB_API_KEY}`,
        },
      });
      const data = response.data;

      return data.genres.map((g: any) => ({
        id: g.id,
        name: g.name,
      }));
    } catch (error) {
      console.error("Error fetching weather data:", error);

      throw error;
    }
  }
}
