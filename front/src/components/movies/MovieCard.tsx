import { Card } from "@/components/ui/card";
import type { Movie } from "common/";
import CollapsibleOverview from "./CollapsibleOverview";
import FavoriteButton from "./FavoriteButton";
import RatingBadge from "./RatingBadge";
import PosterBackground from "./PosterBackground";

interface Props {
  movie: Movie;
}

export function MovieCard({ movie }: Props) {
  return (
    <Card className="relative overflow-hidden aspect-[4/5] py-0">
      <PosterBackground title={movie.title} posterPath={movie.posterPath} />
      <div className="mt-auto z-10 p-4 flex flex-col justify-end">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white truncate flex-grow">
              {movie.title}
            </h3>
            <div className="flex items-center space-x-2">
              <RatingBadge rating={movie.rating} />
              <FavoriteButton movieId={movie.id} />
            </div>
          </div>
          <CollapsibleOverview overview={movie.overview} />
        </div>
      </div>
    </Card>
  );
}
