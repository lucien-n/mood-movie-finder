"use client";

import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { getRecommendations } from "@/lib/api";
import { Movie } from "common";
import { MovieProps } from "@/sections/movies/types";

export const useRecommendations = () => {
  const [city, setCity] = useState("");
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const handleScrollToTop = () => {
    scrollableRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    scrollableRef,
    scrollPosition,
    formattedMovies,
    isPending,
    data,
    handleSearch,
    handleToggleFavorite,
    handleScrollToTop,
    setScrollPosition,
  };
};
