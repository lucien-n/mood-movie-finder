import { useQuery } from "@tanstack/react-query";
import type { Movie } from "common";
import { useState } from "react";
import MovieGrid from "./MovieGrid";
import SearchBar from "./SearchBar";

export default function Recommendations() {
  const [city, setCity] = useState("");

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
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-3 mb-8">
          <SearchBar
            onSearch={(city) => {
              setCity(city);
              refetch();
            }}
            placeholder="Paris"
          />
          <h1 className="text-3xl font-bold text-center">
            Movies based on the weather
          </h1>
          <div></div>
        </div>
        {data && <MovieGrid movies={data} />}
      </div>
    </>
  );
}
