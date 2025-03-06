"use client";

import { getRecommendations } from "@/lib/api";
import { MovieProps } from "@/sections/movies/types";
import { useQuery } from "@tanstack/react-query";
import { Movie, WeatherCondition } from "common";
import { useMemo, useState } from "react";
import { useFavorites } from "./useFavorites";

type HandleSearch = (search: string) => void;

type UseRecommendations = () => {
  movies: MovieProps[] | undefined;
  weatherCondition: WeatherCondition | undefined;
  loading: boolean;
  handleSearch: HandleSearch;
};

export const useRecommendations: UseRecommendations = () => {
  const [city, setCity] = useState("");

  const { data, isPending: loading } = useQuery({
    queryKey: ["recommendations", city],
    queryFn: ({ queryKey: [, city] }) => getRecommendations(city),
  });

  const { isFavorite } = useFavorites();

  const movies: MovieProps[] | undefined = useMemo(
    () =>
      data?.movies.map((movie: Movie) => ({
        ...movie,
        isFavorite: isFavorite(movie.id),
      })),
    [data, isFavorite]
  );

  const handleSearch: HandleSearch = (search: string): void => {
    setCity(search);
  };

  return {
    movies,
    weatherCondition: data?.weatherCondition,
    loading,
    handleSearch,
  };
};
