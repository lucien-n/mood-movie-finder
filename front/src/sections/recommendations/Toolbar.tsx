import { WeatherCondition } from "common";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";

interface Props {
  weather?: WeatherCondition;
  onSearch: (search: string) => void;
  isLoading: boolean;
}

export default function Toolbar({ weather, onSearch, isLoading }: Props) {
  return (
    <nav className="pb-3 flex flex-col sm:flex-row justify-between py-4">
      <SearchBar
        onSearch={onSearch}
        placeholder="Paris, Tokyo, Los Angeles..."
        isLoading={isLoading}
      />

      <CurrentWeather weather={weather} />
    </nav>
  );
}
