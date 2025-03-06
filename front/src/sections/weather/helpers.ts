import { WeatherCondition } from "common";
import { IconName } from "lucide-react/dynamic";

export const weatherConditionSpecs: Record<
  WeatherCondition,
  { icon: { name: IconName; color: string }; label: string }
> = {
  [WeatherCondition.CLEAR_SKY]: {
    icon: { name: "sun", color: "text-yellow-500" },
    label: "Clear Sky",
  },
  [WeatherCondition.FEW_CLOUDS]: {
    icon: { name: "cloud-sun", color: "text-gray-500" },
    label: "Few Clouds",
  },
  [WeatherCondition.SCATTERED_CLOUDS]: {
    icon: { name: "cloud", color: "text-gray-500" },
    label: "Scattered Clouds",
  },
  [WeatherCondition.BROKEN_CLOUDS]: {
    icon: { name: "cloudy", color: "text-gray-500" },
    label: "Broken Clouds",
  },
  [WeatherCondition.SHOWER_RAIN]: {
    icon: { name: "cloud-hail", color: "text-blue-500" },
    label: "Shower Rain",
  },
  [WeatherCondition.RAIN]: {
    icon: { name: "cloud-rain", color: "text-blue-500" },
    label: "Rain",
  },
  [WeatherCondition.THUNDERSTORM]: {
    icon: { name: "cloud-lightning", color: "text-purple-500" },
    label: "Thunderstorm",
  },
  [WeatherCondition.SNOW]: {
    icon: { name: "cloud-snow", color: "text-blue-200" },
    label: "Snow",
  },
  [WeatherCondition.MIST]: {
    icon: { name: "cloud-fog", color: "text-gray-400" },
    label: "Mist",
  },
};
