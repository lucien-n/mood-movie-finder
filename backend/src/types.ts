export enum MovieGenre {
  ACTION = 28,
  ADVENTURE = 12,
  ANIMATION = 16,
  COMEDY = 35,
  CRIME = 80,
  DOCUMENTARY = 99,
  DRAMA = 18,
  FAMILY = 10751,
  FANTASY = 14,
  HISTORY = 36,
  HORROR = 27,
  MUSIC = 10402,
  MYSTERY = 9648,
  ROMANCE = 10749,
  SCIENCE_FICTION = 878,
  TV_MOVIE = 10770,
  THRILLER = 53,
  WAR = 10752,
  WESTERN = 37,
}

export enum WeatherCondition {
  CLEAR_SKY = "clear sky",
  FEW_CLOUDS = "few clouds",
  SCATTERED_CLOUDS = "scattered clouds",
  BROKEN_CLOUDS = "broken clouds",
  SHOWER_RAIN = "shower rain",
  RAIN = "rain",
  THUNDERSTORM = "thunderstorm",
  SNOW = "snow",
  MIST = "mist",
}

export const WEATHER_GENRE: Record<WeatherCondition, MovieGenre> = {
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

export const isWeatherCondition = (str: string): str is WeatherCondition =>
  Object.values(WeatherCondition).some((condition) => condition === str);
