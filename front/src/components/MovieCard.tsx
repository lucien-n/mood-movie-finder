import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Movie } from "common/";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Props {
  movie: Movie;
}

export function MovieCard({ movie }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 4.0)
      return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200";
    if (rating >= 3.0)
      return "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200";
    return "bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-200";
  };

  return (
    <Card className="relative overflow-hidden aspect-[4/5] pt-0">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.posterPath}`}
          alt={`${movie.title} poster`}
          className="absolute object-cover w-full h-full blur-md"
        />
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.posterPath}`}
          alt={`${movie.title} poster`}
          className="absolute object-contain w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end">
        <div className="relative z-10 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white truncate flex-grow">
              {movie.title}
            </h3>
            <Badge
              className={cn(
                "ml-2 shrink-0 backdrop-opacity-30 backdrop-blur-2xl",
                getRatingBadgeColor(movie.rating)
              )}
            >
              {movie.rating}
            </Badge>
          </div>
          <div
            className="text-sm text-gray-200 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div
              className={cn(
                "transition-all duration-300 ease-in-out overflow-hidden line-clamp-[9]",
                isExpanded ? "max-h-[13em]" : "max-h-[3em]"
              )}
            >
              <p>{movie.overview}</p>
            </div>
            <div className="flex items-center mt-1 text-gray-400 hover:text-gray-200">
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  <span className="text-xs">Show less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  <span className="text-xs">Show more</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
    // <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-lg pt-0">
    //   <div className="relative aspect-[3/4] w-full">
    // <img
    //   src={`https://image.tmdb.org/t/p/w300/${movie.posterPath}`}
    //   alt={`${movie.title} poster`}
    //   className="object-cover w-full h-full"
    // />
    //   </div>
    //   <CardHeader className="p-4 py-0">
    //     <div className="flex justify-between items-start">
    //       <CardTitle className="text-lg font-bold line-clamp-1">
    //         {movie.title}
    //       </CardTitle>
    //       <Badge
    //         variant="outline"
    //         className={cn("ml-2 shrink-0", getRatingBadgeColor(movie.rating))}
    //       >
    //         {movie.rating.toFixed(1)}
    //       </Badge>
    //     </div>
    //   </CardHeader>
    //   <CardContent className="p-4 py-0 flex-grow">
    //     <p className="text-sm text-muted-foreground line-clamp-3">
    //       {movie.overview}
    //     </p>
    //   </CardContent>
    //   <CardFooter className="p-4 py-0">
    //     <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md text-sm font-medium transition-colors">
    //       View Details
    //     </button>
    //   </CardFooter>
    // </Card>
  );
}
