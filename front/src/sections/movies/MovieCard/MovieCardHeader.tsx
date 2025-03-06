import { useFavorites } from "@/lib/hooks/useFavorites";
import FavoriteButton from "../FavoriteButton";
import RatingBadge from "../RatingBadge";
import { MovieGenre } from "common";
import { MOVIE_GENRE_LABEL } from "../types";
import { Badge } from "@/components/ui/badge";

interface Props {
  movieId: number;
  title: string;
  genres: MovieGenre[];
  rating: number;
}

export default function MovieCardHeader({
  movieId,
  title,
  genres,
  rating,
}: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="w-full">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-xl font-bold text-white truncate flex-grow">
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
