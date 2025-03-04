import axios from "axios";
import { getEnvVariable } from "@/env";
import MovieResponse from "./dto/movie-response";

const TMDB_API_KEY = getEnvVariable("TMDB_API_KEY");

export default () => {
  const findManyByName = async (name: string): Promise<MovieResponse[]> => {
    const url = "https://api.themoviedb.org/3/search/movie";
    const params = {
      query: name,
    };

    try {
      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
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
  };

  const findManyByGenre = async (genre: string): Promise<MovieResponse[]> => {
    const url = "https://api.themoviedb.org/3/discover/movie";
    const params = {
      with_genres: genre,
    };

    try {
      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
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
  };

  return {
    findManyByName,
    findManyByGenre,
  };
};
