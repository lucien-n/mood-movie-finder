// common/src/errors.ts
export enum ApiErrorCode {
  InvalidRequest = "invalid-request",
  Unauthorized = "unauthorized",
  CityNotFound = "city-not-found",
  WeatherNotFound = "weather-not-found",
  RateLimited = "too-many-requests",
  InternalError = "internal-error",
}

export const isApiError = (str: string): str is ApiErrorCode =>
  Object.values(ApiErrorCode).some((error) => error === str);
