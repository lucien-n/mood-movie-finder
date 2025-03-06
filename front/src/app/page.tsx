"use client";

import { useRecommendations } from "@/lib/hooks/useRecommendations";
import MovieCard from "@/sections/movies/MovieCard";
import { MovieCardSkeleton } from "@/sections/movies/MovieCardSkeleton";
import MovieGrid from "@/sections/recommendations/MovieGrid";
import ScrollToTopButton from "@/sections/recommendations/ScrollTopButton";
import SearchPrompt from "@/sections/recommendations/SearchPrompt";
import Toolbar from "@/sections/recommendations/Toolbar";

const SKELETON_ITEMS = 16;

export default function RecommendationsPage() {
  const {
    scrollableRef,
    scrollPosition,
    formattedMovies,
    isPending,
    data,
    handleSearch,
    handleToggleFavorite,
    handleScrollToTop,
    setScrollPosition,
  } = useRecommendations();

  return (
    <div className="overflow-hidden container mx-auto relative">
      <div
        className="overflow-y-scroll max-h-screen px-2 pb-4"
        ref={scrollableRef}
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollTop)}
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
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggleFavorite={() => handleToggleFavorite(movie.id)}
              />
            ))}
          </MovieGrid>
        ) : (
          <SearchPrompt />
        )}

        {scrollPosition > 300 && (
          <ScrollToTopButton onClick={handleScrollToTop} />
        )}
      </div>
    </div>
  );
}
