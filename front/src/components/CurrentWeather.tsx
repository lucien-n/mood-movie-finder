import { WeatherCondition } from "common";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

const weatherSpecs: Record<
  WeatherCondition,
  { icon: IconName; label: string }
> = {
  [WeatherCondition.CLEAR_SKY]: {
    icon: "sun",
    label: "Clear Sky",
  },
  [WeatherCondition.FEW_CLOUDS]: {
    icon: "cloud-sun",
    label: "Few Clouds",
  },
  [WeatherCondition.SCATTERED_CLOUDS]: {
    icon: "cloud",
    label: "Scattered Clouds",
  },
  [WeatherCondition.BROKEN_CLOUDS]: {
    icon: "cloudy",
    label: "Broken Clouds",
  },
  [WeatherCondition.SHOWER_RAIN]: {
    icon: "cloud-hail",
    label: "Shower Rain",
  },
  [WeatherCondition.RAIN]: {
    icon: "cloud-rain",
    label: "Rain",
  },
  [WeatherCondition.THUNDERSTORM]: {
    icon: "cloud-lightning",
    label: "Thunderstorm",
  },
  [WeatherCondition.SNOW]: {
    icon: "cloud-snow",
    label: "Snow",
  },
  [WeatherCondition.MIST]: {
    icon: "cloud-fog",
    label: "Mist",
  },
};

interface Props {
  weather: WeatherCondition | undefined;
}

export default function CurrentWeather({ weather }: Props) {
  if (!weather) return <h1 className="text-center text-lg">N/A</h1>;

  const { icon, label } = weatherSpecs[weather];

  return (
    <div className="w-fit flex items-center gap-3">
      <h1 className="text-lg">{label}</h1>
      <DynamicIcon name={icon} className="size-6 lg:size-8" strokeWidth={1} />
    </div>
  );
}
