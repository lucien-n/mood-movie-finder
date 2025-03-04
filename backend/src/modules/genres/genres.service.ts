import axios from "axios";
import { getEnvVariable } from "@/env";
import GenreResponse from "./dto/genre-response";

const TMDB_API_KEY = getEnvVariable("TMDB_API_KEY");

export default () => {
  const findMany = async (): Promise<GenreResponse[]> => {
    const url = "https://api.themoviedb.org/3/genre/movie/list";

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
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
  };

  return {
    findMany,
  };
};
