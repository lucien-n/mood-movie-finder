"use client";

import { useRecommendations } from "@/lib/hooks/useRecommendations";
import { useScrollable } from "@/lib/hooks/useScrollable";
import MovieCard from "@/sections/movies/MovieCard";
import { MovieCardSkeleton } from "@/sections/movies/MovieCardSkeleton";
import MovieGrid from "@/sections/recommendations/MovieGrid";
import ScrollToTopButton from "@/sections/recommendations/ScrollTopButton";
import SearchPrompt from "@/sections/recommendations/SearchPrompt";
import Toolbar from "@/sections/recommendations/Toolbar";

const SKELETON_ITEMS = 16;

export default function RecommendationsPage() {
  const { formattedMovies, isPending, data, handleSearch } =
    useRecommendations();

  const { scrollableRef, handleScroll, scroll, handleScrollToTop } =
    useScrollable();

  return (
    <div className="overflow-hidden container mx-auto relative">
      <div
        ref={scrollableRef}
        onScroll={handleScroll}
        className="overflow-y-scroll max-h-screen px-2 pb-4"
      >
        <Toolbar
          weather={data?.weather}
          onSearch={handleSearch}
          isLoading={isPending}
        />

        {isPending ? (
          <MovieGrid>
            {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
              <MovieCardSkeleton key={`skeleton-${index}`} />
            ))}
          </MovieGrid>
        ) : data ? (
          <MovieGrid>
            {formattedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MovieGrid>
        ) : (
          <SearchPrompt />
        )}

        {scroll > 300 && <ScrollToTopButton onClick={handleScrollToTop} />}
      </div>
    </div>
  );
}
