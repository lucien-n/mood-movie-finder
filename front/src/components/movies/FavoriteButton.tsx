import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Props {
  isFavorite: boolean;
  onToggleFavorite: VoidFunction;
}

export default function FavoriteButton({
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <button
      onClick={onToggleFavorite}
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
