import { getRecommendation } from "@/lib/api";
import type { RecommendResponse } from "common";
import { ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import MovieGrid from "./movies/MovieGrid";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";

export default function Recommendations() {
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(0);

  const [city, setCity] = useState("");
  const [data, setData] = useState<RecommendResponse | undefined>();

  useEffect(() => {
    if (!city) return;

    getRecommendation(city).then(setData);
  }, [setData, city]);

  const handleScrollToTop = () => {
    if (!scrollableRef) return;

    scrollableRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-h-screen overflow-hidden container mx-auto relative">
      <div
        className="overflow-y-scroll h-screen max-h-screen px-2 pb-4"
        ref={scrollableRef}
        onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
      >
        <nav className="pb-3 flex flex-col sm:flex-row justify-between py-4">
          <SearchBar
            onSearch={setCity}
            placeholder="Paris, Tokyo, Los Angeles..."
          />
          <CurrentWeather weather={data?.weather} />
        </nav>

        {data && <MovieGrid movies={data.movies} />}

        {scroll > 300 && (
          <Button
            className="absolute bottom-8 right-8 z-50 h-12 rounded-full group hover:cursor-pointer hover:bg-primary px-12"
            onClick={handleScrollToTop}
          >
            <ChevronUp />
            <p className="group-hover:underline">Back to top</p>
          </Button>
        )}
      </div>
    </div>
  );
}
