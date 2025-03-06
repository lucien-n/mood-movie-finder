import { WeatherCondition } from "common";
import { DynamicIcon } from "lucide-react/dynamic";

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
        <h2 className="text-xl font-semibold capitalize">
          Current Weather in {city}: {label}
        </h2>
        <p className="text-muted-foreground">
          Here are some movies that match the mood:
        </p>
      </div>
    </div>
  );
}
