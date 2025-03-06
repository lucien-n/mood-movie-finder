import FavoriteButton from "../FavoriteButton";
import RatingBadge from "../RatingBadge";

interface Props {
  title: string;
  rating: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function MovieCardHeader({
  title,
  rating,
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <div className="flex justify-between items-start">
      <h3 className="text-xl font-bold text-white truncate flex-grow">
        {title}
      </h3>
      <div className="flex items-center space-x-2">
        <RatingBadge rating={rating} />
        <FavoriteButton
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </div>
  );
}
