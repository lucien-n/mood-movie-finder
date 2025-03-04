import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Movie } from "common/";

interface Props {
  movie: Movie;
}

export function MovieCard({ movie }: Props) {
  const getRatingBadgeColor = (rating: number) => {
    const getProps = (color: string) =>
      `bg-${color}-100 text-${color}-800 hover:bg-${color}-200 border-${color}-200`;

    if (rating >= 4.0) return getProps("emerald");
    if (rating >= 3.0) return getProps("amber");
    return getProps("rose");
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-lg pt-0">
      <div className="relative aspect-[3/4] w-full">
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.posterPath}`}
          alt={`${movie.title} poster`}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader className="p-4 py-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-1">
            {movie.title}
          </CardTitle>
          <Badge
            variant="outline"
            className={cn("ml-2 shrink-0", getRatingBadgeColor(movie.rating))}
          >
            {movie.rating.toFixed(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 py-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {movie.overview}
        </p>
      </CardContent>
      <CardFooter className="p-4 py-0">
        <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md text-sm font-medium transition-colors">
          View Details
        </button>
      </CardFooter>
    </Card>
  );
}
