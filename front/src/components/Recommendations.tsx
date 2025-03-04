import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDelayedSearch } from "@/lib/hooks/useDelayedSearch";
import { useQuery } from "@tanstack/react-query";
import type { Movie } from "common";
import { useState } from "react";
import { Separator } from "./ui/separator";

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

      <div className="grid grid-cols-2 gap-5">
        {data ? (
          data.map(({ id, title, overview, posterPath }) => (
            <Card key={id} className="w-full flex flex-row py-0 gap-0">
              <div className="w-full aspect-[9/16]">
                <img
                  src={`https://image.tmdb.org/t/p/w200/${posterPath}`}
                  alt={`${title}'s poster`}
                />
              </div>
              <div className="flex flex-col">
                <CardHeader className="grid gap-1">
                  <p className="text-3xl font-semibold">{title}</p>
                </CardHeader>
                <CardContent className="mt-2">
                  <CardDescription>{overview}</CardDescription>
                </CardContent>
              </div>
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
