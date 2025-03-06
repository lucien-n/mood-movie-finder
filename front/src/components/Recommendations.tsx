"use client";

import { Button } from "@/components/ui/button";
import { getRecommendations } from "@/lib/api";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import type { Movie } from "common";
import { ChevronUp } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { MovieCard } from "./movies/MovieCard";
import { MovieCardSkeleton } from "./movies/MovieCardSkeleton";
import { MovieProps } from "./movies/types";
import Toolbar from "./Toolbar";

export default function Recommendations() {
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(0);

  const [city, setCity] = useState("");

  const { data, isPending, refetch } = useQuery({
    queryKey: ["recommendations", city],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryFn: ({ queryKey: [_key, city] }) => getRecommendations(city),
  });

  const [favoriteMovies, setFavoriteMovies] = useLocalStorage<number[]>(
    "favorite-movies",
    []
  );

  const handleScrollToTop = () => {
    if (!scrollableRef) return;

    scrollableRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formattedMovies: MovieProps[] = useMemo(
    () =>
      data?.movies.map(
        (movie: Movie) =>
          ({
            ...movie,
            isFavorite: favoriteMovies.some((id) => movie.id === id),
          } satisfies MovieProps)
      ) ?? [],
    [data, favoriteMovies]
  );

  const handleSearch = (search: string) => {
    setCity(search);
    refetch();
  };

  const handleToggleFavorite = (movie: MovieProps) => {
    if (!movie.isFavorite) {
      setFavoriteMovies((prev) => [...prev, movie.id]);
      return;
    }

    setFavoriteMovies(favoriteMovies.filter((id) => id !== movie.id));
  };

  return (
    <div className="overflow-hidden container mx-auto relative">
      <div
        className="overflow-y-scroll max-h-screen px-2 pb-4"
        ref={scrollableRef}
        onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
      >
        <Toolbar
          weather={data?.weather}
          onSearch={handleSearch}
          isLoading={isPending}
        />

        {isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 16 }).map((_, index) => (
              // todo: change key
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {formattedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggleFavorite={() => handleToggleFavorite(movie)}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 h-max overflow-hidden ml-2">
            <ChevronUp className="animate-bounce" />
            <h1 className="text-2xl">Start by searching for your city</h1>
          </div>
        )}

        {scroll > 300 && (
          <Button
            className="absolute bottom-8 right-8 z-20 h-12 rounded-full group hover:cursor-pointer hover:bg-primary px-12"
            onClick={handleScrollToTop}
          >
            <ChevronUp />
            <p className="group-hover:underline">Back to top</p>
          </Button>
        )}
      </div>
    </div>
  );
}
