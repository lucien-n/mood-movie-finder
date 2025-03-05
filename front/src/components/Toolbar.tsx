import { WeatherCondition } from "common";
import CurrentWeather from "./CurrentWeather";
import SearchBar from "./SearchBar";

interface Props {
  weather?: WeatherCondition;
  onSearch: (search: string) => void;
}

export default function Toolbar({ weather, onSearch }: Props) {
  return (
    <nav className="pb-3 flex flex-col sm:flex-row justify-between py-4">
      <SearchBar
        onSearch={onSearch}
        placeholder="Paris, Tokyo, Los Angeles..."
      />

      <CurrentWeather weather={weather} />
    </nav>
  );
}
