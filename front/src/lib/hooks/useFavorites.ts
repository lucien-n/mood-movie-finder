"use client";

import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { useCallback } from "react";

export const useFavorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useLocalStorage<number[]>(
    "favorite-movies",
    []
  );

  const isFavorite = useCallback(
    (movieId: number) => favoriteMovies.includes(movieId),
    [favoriteMovies]
  );

  const toggleFavorite = useCallback(
    (movieId: number) => {
      setFavoriteMovies((prev) =>
        isFavorite(movieId)
          ? prev.filter((id) => id !== movieId)
          : [...prev, movieId]
      );
    },
    [isFavorite, setFavoriteMovies]
  );

  return {
    toggleFavorite,
    isFavorite,
  };
};
