"use client";

import { getRecommendations } from "@/lib/api";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { MovieProps } from "@/sections/movies/types";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "common";
import { useMemo, useState } from "react";

export const useRecommendations = () => {
  const [city, setCity] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["recommendations", city],
    queryFn: ({ queryKey: [, city] }) => getRecommendations(city),
  });

  const [favoriteMovies, setFavoriteMovies] = useLocalStorage<number[]>(
    "favorite-movies",
    []
  );

  const favoriteMovieIds = useMemo(
    () => new Set(favoriteMovies),
    [favoriteMovies]
  );

  const formattedMovies: MovieProps[] = useMemo(
    () =>
      data?.movies.map((movie: Movie) => ({
        ...movie,
        isFavorite: favoriteMovieIds.has(movie.id),
      })) ?? [],
    [data, favoriteMovieIds]
  );

  const handleSearch = (search: string) => setCity(search);

  const handleToggleFavorite = (movieId: number) => {
    setFavoriteMovies((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  return {
    formattedMovies,
    isPending,
    data,
    handleSearch,
    handleToggleFavorite,
  };
};
