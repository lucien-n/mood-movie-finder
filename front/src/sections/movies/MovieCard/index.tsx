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
    <Card className="relative aspect-[4/5] overflow-hidden py-0">
      <MovieCardBackground movie={movie} />
      <MovieCardContent>
        <MovieCardHeader movie={movie} isExpanded={isExpanded} />
        <MovieCardOverview
          movie={movie}
          isExpanded={isExpanded}
          onToggleExpand={() => setIsExpanded((prev) => !prev)}
        />
      </MovieCardContent>
    </Card>
  );
}
