import { API_BASE_URL } from "@/lib/constants";
import axios from "axios";
import type { RecommendResponse } from "common";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CurrentWeather from "./CurrentWeather";
import MovieGrid from "./MovieGrid";
import SearchBar from "./SearchBar";
import { Card } from "@/components/ui/card";

const getRecommendation = async (
  city: string
): Promise<RecommendResponse | undefined> => {
  try {
    const res = await axios.get<RecommendResponse>(
      `${API_BASE_URL}/recommend/${city}`
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.status === 404) {
        toast.error("City not found");
        return;
      }
    }

    toast.error("An error occured");
  }
};

export default function Recommendations() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<RecommendResponse | undefined>();

  const handleSearch = async (city: string) => {
    if (!city) return;
    setCity(city);
  };

  useEffect(() => {
    getRecommendation(city).then(setData);
  }, [setData, city]);

  return (
    <div className="container mx-auto pb-4">
      <nav className="sticky top-0 z-30 pb-3">
        <Card className="flex flex-col sm:flex-row justify-between rounded-none border-0 shadow-none w-full p-3 gap-2">
          <SearchBar onSearch={handleSearch} placeholder="Paris" />
          <CurrentWeather weather={data?.weather} />
        </Card>
      </nav>

      <div className="px-1">{data && <MovieGrid movies={data.movies} />}</div>
    </div>
  );
}
