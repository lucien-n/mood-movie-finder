import { Card } from "@/components/ui/card";
import CollapsibleOverview from "../CollapsibleOverview";
import PosterBackground from "../PosterBackground";
import { MovieProps } from "../types";
import MovieCardContent from "./MovieCardContent";
import MovieCardHeader from "./MovieCardHeader";

interface Props {
  movie: MovieProps;
}

export default function MovieCard({ movie }: Props) {
  return (
    <Card className="relative overflow-hidden aspect-[4/5] py-0">
      <PosterBackground title={movie.title} posterPath={movie.posterPath} />
      <MovieCardContent>
        <MovieCardHeader
          movieId={movie.id}
          genres={movie.genres}
          title={movie.title}
          rating={movie.rating}
        />
        <CollapsibleOverview overview={movie.overview} />
      </MovieCardContent>
    </Card>
  );
}
