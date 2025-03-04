import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useDelayedSearch } from "@/lib/hooks/useDelayedSearch";
import { useQuery } from "@tanstack/react-query";
import type { Movie } from "common";
import { useState } from "react";

export default function Recommendations() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useDelayedSearch((city) => {
    setCity(city);
    refetch();
  }, city);

  const { data, refetch } = useQuery<Movie[]>({
    queryKey: ["recommended-movies"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/recommend/${city}`).then((res) =>
        res.json()
      ),
    enabled: false,
  });

  return (
    <>
      <Card>
        <CardHeader>
          <Label htmlFor="city" className="text-xl">
            Search
          </Label>
        </CardHeader>
        <CardContent>
          <Input
            id="city"
            value={search}
            placeholder="Paris"
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
        </CardContent>
      </Card>

      <Separator orientation="horizontal" className="my-5" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {data ? (
          data.map((movie) => (
            <Card
              key={movie.id}
              className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-lg pt-0"
            >
              <div className="relative aspect-[3/4] w-full">
                <img
                  src={`https://image.tmdb.org/t/p/w400/${movie.posterPath}`}
                  alt={`${movie.title} poster`}
                  className="object-cover w-full"
                />
              </div>
              <CardHeader className="p-4 py-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold line-clamp-1">
                    {movie.title}
                  </CardTitle>
                  <Badge variant="outline" className="ml-2 shrink-0">
                    {/* {movie.rating} */}
                    4.5
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
          ))
        ) : (
          <h1 className="text-3xl font-semibold text-center">
            No recommendations found :(
          </h1>
        )}
      </div>
    </>
  );
}
