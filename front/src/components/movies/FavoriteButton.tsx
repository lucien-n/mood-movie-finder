import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Props {
  movieId: number;
}

export default function FavoriteButton({ movieId }: Props) {
  const [isFavorite, setIsFavorite] = useLocalStorage<boolean>(
    ` favorite-${movieId}`,
    false
  );

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className="text-white hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
    >
      <Star
        className={cn(
          "w-6 h-6",
          isFavorite ? "fill-yellow-400 text-yellow-400" : "fill-none"
        )}
      />
    </button>
  );
}
