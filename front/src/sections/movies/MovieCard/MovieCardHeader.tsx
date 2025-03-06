import { MovieGenre } from "common";

import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { cn } from "@/lib/utils";
import FavoriteButton from "../FavoriteButton";
import RatingBadge from "../RatingBadge";
import { MOVIE_GENRE_LABEL } from "../types";

interface Props {
  movieId: number;
  title: string;
  genres: MovieGenre[];
  rating: number;
  isExpanded: boolean;
}

export default function MovieCardHeader({
  movieId,
  title,
  genres,
  rating,
  isExpanded,
}: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="w-full">
      <div className="flex justify-between items-start gap-2">
        <h3
          className={cn(
            "text-xl font-bold text-white flex-grow",
            !isExpanded && "truncate"
          )}
        >
          {title}
        </h3>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <RatingBadge rating={rating} />
          <FavoriteButton
            isFavorite={isFavorite(movieId)}
            onToggleFavorite={() => toggleFavorite(movieId)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {genres.map((genreId) => (
          <Badge key={genreId}>{MOVIE_GENRE_LABEL[genreId]}</Badge>
        ))}
      </div>
    </div>
  );
}
