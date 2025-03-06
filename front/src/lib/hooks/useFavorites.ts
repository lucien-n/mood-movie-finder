"use client";

import { useCallback } from "react";

import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

type IsFavorite = (movieId: number) => boolean;
type ToggleFavorite = (movieId: number) => void;

type UseFavorites = () => {
  isFavorite: IsFavorite;
  toggleFavorite: ToggleFavorite;
};

export const useFavorites: UseFavorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useLocalStorage<number[]>(
    "favorite-movies",
    []
  );

  const isFavorite: IsFavorite = useCallback(
    (movieId: number) => favoriteMovies.includes(movieId),
    [favoriteMovies]
  );

  const toggleFavorite: ToggleFavorite = useCallback(
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
