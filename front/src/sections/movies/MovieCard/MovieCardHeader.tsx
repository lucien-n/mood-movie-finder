import { useFavorites } from "@/lib/hooks/useFavorites";
import FavoriteButton from "../FavoriteButton";
import RatingBadge from "../RatingBadge";

interface Props {
  movieId: number;
  title: string;
  rating: number;
}

export default function MovieCardHeader({ movieId, title, rating }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="flex justify-between items-start">
      <h3 className="text-xl font-bold text-white truncate flex-grow">
        {title}
      </h3>
      <div className="flex items-center space-x-2">
        <RatingBadge rating={rating} />
        <FavoriteButton
          isFavorite={isFavorite(movieId)}
          onToggleFavorite={() => toggleFavorite(movieId)}
        />
      </div>
    </div>
  );
}
