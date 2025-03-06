import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        "group rounded-full cursor-pointer transition-colors hover:bg-yellow-400/20",
        className
      )}
    >
      <Star
        className={cn(
          "size-6 transition-all",
          isFavorite
            ? "fill-yellow-400 text-yellow-400"
            : "fill-transparent text-muted-foreground group-hover:text-yellow-400"
        )}
      />
    </Button>
  );
}
