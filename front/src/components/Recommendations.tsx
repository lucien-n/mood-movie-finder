import { API_BASE_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import type { RecommendResponse } from "common";
import { useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import MovieGrid from "./MovieGrid";
import SearchBar from "./SearchBar";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function Recommendations() {
  const [city, setCity] = useState("");

  const { data, refetch, error } = useQuery<RecommendResponse>({
    queryKey: ["recommended-movies"],
    queryFn: () =>
      fetch(`${API_BASE_URL}/recommend/${city}`).then((res) => res.json()),
    enabled: false,
  });

  const handleSearch = async (city: string) => {
    if (!city) {
      return;
    }

    setCity(city);
    await refetch();
  };

  useEffect(() => {
    if (!error) return;

    toast.error(error.message);
  }, [error]);

  return (
    <>
      <Card className="flex mb-4 items-center justify-between flex-col md:flex-row gap-3 py-3 px-4">
        <SearchBar onSearch={handleSearch} placeholder="Paris" />
        <CurrentWeather weather={data?.weather} />
      </Card>

      {data && <MovieGrid movies={data.movies} />}
    </>
  );
}
