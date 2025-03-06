import { Card } from "@/components/ui/card";
import MovieCardHeader from "./MovieCardHeader";
import MovieCardContent from "./MovieCardContent";
import { MovieProps } from "../types";
import PosterBackground from "../PosterBackground";
import CollapsibleOverview from "../CollapsibleOverview";

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
          title={movie.title}
          rating={movie.rating}
        />
        <CollapsibleOverview overview={movie.overview} />
      </MovieCardContent>
    </Card>
  );
}
