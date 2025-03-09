export enum ApiErrorCode {
  CITY_NOT_FOUND = "city-not-found",
  WEATHER_NOT_FOUND = "weather-not-found",
  TOO_MANY_REQUESTS = "too-many-requests",
  INTERNAL_ERROR = "internal-error",
}

export const isApiError = (str: string): str is ApiErrorCode =>
  Object.values(ApiErrorCode).some((error) => error === str);
