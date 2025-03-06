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
  const { movies, weatherCondition, loading, handleSearch } =
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
          weather={weatherCondition}
          onSearch={handleSearch}
          isLoading={loading}
        />

        {loading ? (
          <MovieGrid>
            {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
              <MovieCardSkeleton key={`skeleton-${index}`} />
            ))}
          </MovieGrid>
        ) : movies ? (
          <MovieGrid>
            {movies.map((movie) => (
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
