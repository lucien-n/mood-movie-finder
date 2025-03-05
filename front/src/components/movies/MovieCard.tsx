import { Card } from "@/components/ui/card";
import CollapsibleOverview from "./CollapsibleOverview";
import FavoriteButton from "./FavoriteButton";
import PosterBackground from "./PosterBackground";
import RatingBadge from "./RatingBadge";
import { MovieProps } from "./types";

interface Props {
  movie: MovieProps;
  onToggleFavorite: VoidFunction;
}

export function MovieCard({ movie, onToggleFavorite }: Props) {
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
              <FavoriteButton
                isFavorite={movie.isFavorite}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          </div>
          <CollapsibleOverview overview={movie.overview} />
        </div>
      </div>
    </Card>
  );
}
