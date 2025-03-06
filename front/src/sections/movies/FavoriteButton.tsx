import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  className?: string;
}

export default function FavoriteButton({
  isFavorite,
  onToggleFavorite,
  className,
}: Props) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggleFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "group cursor-pointer rounded-full transition-colors hover:bg-yellow-400/20",
        className
      )}
    >
      <Star
        className={cn(
          "size-6 transition-all",
          isFavorite
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground fill-transparent group-hover:text-yellow-400"
        )}
      />
    </Button>
  );
}
