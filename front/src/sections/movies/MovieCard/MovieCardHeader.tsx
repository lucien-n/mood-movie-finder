import { MovieGenre } from "common";

import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { cn } from "@/lib/utils";
import FavoriteButton from "../FavoriteButton";
import GenreBadge from "../GenreBadge";
import RatingBadge from "../RatingBadge";
import { MOVIE_GENRE_LABEL, MovieProps } from "../types";

interface Props {
  movie: MovieProps;
  isExpanded: boolean;
}

export default function MovieCardHeader({ movie, isExpanded }: Props) {
  const { id, title, releaseDate, rating, genres } = movie;

  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2">
        <h3
          className={cn(
            "flex flex-grow items-center gap-2 text-xl font-bold text-white",
            !isExpanded && "truncate"
          )}
        >
          {title}
          <Badge className="mt-[0.2rem] bg-neutral-600 text-xs hover:bg-neutral-600/70">
            {new Date(releaseDate).getFullYear()}
          </Badge>
        </h3>

        <div className="flex flex-shrink-0 items-center space-x-2">
          <RatingBadge rating={rating} />
          <FavoriteButton
            isFavorite={isFavorite(id)}
            onToggleFavorite={() => toggleFavorite(id)}
          />
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {genres.map((genre) => (
          <GenreBadge key={genre} genre={genre} />
        ))}
      </div>
    </div>
  );
}
