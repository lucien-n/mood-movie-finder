import { cn } from "@/lib/utils";
import { getRatingBadgeColor } from "./helpers";
import { Badge } from "@/components/ui/badge";

interface Props {
  rating: number;
}

export default function RatingBadge({ rating }: Props) {
  const color = getRatingBadgeColor(rating);

  return (
    <Badge
      className={cn("shrink-0 backdrop-opacity-30 backdrop-blur-2xl", color)}
    >
      {rating}
    </Badge>
  );
}
