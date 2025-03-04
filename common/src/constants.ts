import { MovieGenre, WeatherCondition } from "./types";

export const WEATHER_MOVIE_GENRE: Record<WeatherCondition, MovieGenre> = {
  [WeatherCondition.CLEAR_SKY]: MovieGenre.ADVENTURE,
  [WeatherCondition.FEW_CLOUDS]: MovieGenre.ACTION,
  [WeatherCondition.SCATTERED_CLOUDS]: MovieGenre.COMEDY,
  [WeatherCondition.BROKEN_CLOUDS]: MovieGenre.CRIME,
  [WeatherCondition.SHOWER_RAIN]: MovieGenre.DOCUMENTARY,
  [WeatherCondition.RAIN]: MovieGenre.MYSTERY,
  [WeatherCondition.THUNDERSTORM]: MovieGenre.HORROR,
  [WeatherCondition.SNOW]: MovieGenre.ROMANCE,
  [WeatherCondition.MIST]: MovieGenre.MYSTERY,
};
