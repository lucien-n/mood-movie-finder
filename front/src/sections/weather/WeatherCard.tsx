import { getGenresForWeather, WeatherCondition } from "common";
import { DynamicIcon } from "lucide-react/dynamic";

import GenreBadge from "../movies/GenreBadge";
import { weatherConditionSpecs } from "./helpers";

interface Props {
  city: string;
  weatherCondition: WeatherCondition;
}

export default function WeatherCard({ city, weatherCondition }: Props) {
  const { icon, label } = weatherConditionSpecs[weatherCondition];

  return (
    <div className="bg-muted flex items-center gap-3 rounded-lg p-4">
      <DynamicIcon name={icon.name} className={icon.color} size={32} />
      <div>
        <h2 className="text-xl font-semibold">
          Following the {label.toLowerCase()} weather in {city}
        </h2>
        <p className="text-muted-foreground flex gap-2">
          We recommend those genres{" "}
          <span className="flex flex-wrap gap-1 text-xs">
            {getGenresForWeather(weatherCondition).map((genre) => (
              <GenreBadge key={genre} genre={genre} />
            ))}
          </span>
        </p>
      </div>
    </div>
  );
}
