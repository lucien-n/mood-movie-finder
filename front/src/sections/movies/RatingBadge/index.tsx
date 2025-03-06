import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";
import { getRatingColor } from "./utils";

interface Props {
  rating: number;
  className?: string;
}

const RatingBadge = memo(({ rating, className }: Props) => {
  const colorClass = useMemo(() => getRatingColor(rating), [rating]);

  return (
    <Badge
      className={cn(
        "shrink-0 backdrop-blur-md transition-colors",
        colorClass,
        className
      )}
      aria-label={`Rating: ${rating.toFixed(1)}`}
    >
      {rating.toFixed(1)}
    </Badge>
  );
});

RatingBadge.displayName = "RatingBadge";

export default RatingBadge;
