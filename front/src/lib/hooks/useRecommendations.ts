"use client";

import { getRecommendations } from "@/lib/api";
import { MovieProps } from "@/sections/movies/types";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "common";
import { useMemo, useState } from "react";
import { useFavorites } from "./useFavorites";

export const useRecommendations = () => {
  const [city, setCity] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["recommendations", city],
    queryFn: ({ queryKey: [, city] }) => getRecommendations(city),
  });

  const { isFavorite } = useFavorites();

  const formattedMovies: MovieProps[] = useMemo(
    () =>
      data?.movies.map((movie: Movie) => ({
        ...movie,
        isFavorite: isFavorite(movie.id),
      })) ?? [],
    [data, isFavorite]
  );

  const handleSearch = (search: string): void => {
    setCity(search);
  };

  return {
    formattedMovies,
    isPending,
    data,
    handleSearch,
  };
};
