export enum ApiError {
  RateLimit = "RateLimit",
  CityNotFound = "CityNotFound",
  Unknown = "Unknown",
}

export const isApiError = (error: unknown): error is { body: ApiError } =>
  !!(
    error &&
    typeof error === "object" &&
    "body" in error &&
    typeof error.body === "string" &&
    Object.values(ApiError).some((apiError) => apiError === error.body)
  );
