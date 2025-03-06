import { MovieGenre, WeatherCondition } from "./types";

export const getGenresForWeather = (
  weatherCondition: WeatherCondition
): MovieGenre[] => {
  switch (weatherCondition) {
    case WeatherCondition.CLEAR_SKY:
      return [
        MovieGenre.ADVENTURE,
        MovieGenre.COMEDY,
        MovieGenre.ROMANCE,
        MovieGenre.FAMILY,
      ];
    case WeatherCondition.FEW_CLOUDS:
    case WeatherCondition.SCATTERED_CLOUDS:
      return [
        MovieGenre.FANTASY,
        MovieGenre.ANIMATION,
        MovieGenre.MUSIC,
        MovieGenre.COMEDY,
      ];
    case WeatherCondition.BROKEN_CLOUDS:
      return [MovieGenre.DRAMA, MovieGenre.HISTORY, MovieGenre.WESTERN];
    case WeatherCondition.SHOWER_RAIN:
    case WeatherCondition.RAIN:
      return [MovieGenre.MYSTERY, MovieGenre.ROMANCE, MovieGenre.DRAMA];
    case WeatherCondition.THUNDERSTORM:
      return [
        MovieGenre.ACTION,
        MovieGenre.THRILLER,
        MovieGenre.SCIENCE_FICTION,
      ];
    case WeatherCondition.SNOW:
      return [MovieGenre.FANTASY, MovieGenre.FAMILY, MovieGenre.ADVENTURE];
    case WeatherCondition.MIST:
      return [MovieGenre.HORROR, MovieGenre.MYSTERY, MovieGenre.THRILLER];
    default:
      return [MovieGenre.COMEDY, MovieGenre.ACTION, MovieGenre.ADVENTURE];
  }
};
