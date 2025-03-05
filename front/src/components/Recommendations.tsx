"use client";

import { Button } from "@/components/ui/button";
import { getRecommendation } from "@/lib/api";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import type { Movie, RecommendResponse } from "common";
import { ChevronUp } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MovieCard } from "./movies/MovieCard";
import { MovieProps } from "./movies/types";
import Toolbar from "./Toolbar";

export default function Recommendations() {
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(0);

  const [city, setCity] = useState("Paris");
  const [data, setData] = useState<RecommendResponse | undefined>();

  const [favoriteMovies, setFavoriteMovies] = useLocalStorage<number[]>(
    "favorite-movies",
    []
  );

  useEffect(() => {
    if (!city) return;
    getRecommendation(city).then(setData);
  }, [setData, city]);

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

  const handleToggleFavorite = (movie: MovieProps) => {
    if (!movie.isFavorite) {
      setFavoriteMovies((prev) => [...prev, movie.id]);
      return;
    }

    setFavoriteMovies(favoriteMovies.filter((id) => id !== movie.id));
  };

  return (
    <div className="max-h-screen overflow-hidden container mx-auto relative">
      <div
        className="overflow-y-scroll h-screen max-h-screen px-2 pb-4"
        ref={scrollableRef}
        onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
      >
        <Toolbar weather={data?.weather} onSearch={setCity} />

        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {formattedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggleFavorite={() => handleToggleFavorite(movie)}
              />
            ))}
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
