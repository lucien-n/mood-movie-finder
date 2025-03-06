export enum ApiError {
  RateLimit = "RateLimit",
  CityNotFound = "CityNotFound",
  Unknown = "Unknown",
}

export const isApiError = (str: string): str is ApiError =>
  Object.values(ApiError).some((error) => error === str);
