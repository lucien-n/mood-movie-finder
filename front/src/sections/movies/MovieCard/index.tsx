import { useState } from "react";

import { Card } from "@/components/ui/card";
import { MovieProps } from "../types";
import MovieCardBackground from "./MovieCardBackground";
import MovieCardContent from "./MovieCardContent";
import MovieCardHeader from "./MovieCardHeader";
import MovieCardOverview from "./MovieCardOverview";

interface Props {
  movie: MovieProps;
}

export default function MovieCard({ movie }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="relative overflow-hidden aspect-[4/5] py-0">
      <MovieCardBackground title={movie.title} posterPath={movie.posterPath} />
      <MovieCardContent>
        <MovieCardHeader
          movieId={movie.id}
          genres={movie.genres}
          title={movie.title}
          rating={movie.rating}
          isExpanded={isExpanded}
        />
        <MovieCardOverview
          overview={movie.overview}
          isExpanded={isExpanded}
          onToggleExpand={() => setIsExpanded((prev) => !prev)}
        />
      </MovieCardContent>
    </Card>
  );
}
