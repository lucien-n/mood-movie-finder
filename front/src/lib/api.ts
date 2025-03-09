import axios from "axios";
import { ApiErrorCode, isApiError, RecommendResponse } from "common";
import { toast } from "sonner";

export const getRecommendations = async (
  city: string
): Promise<RecommendResponse | null> => {
  if (!city) return null;

  try {
    const res = await axios.get<RecommendResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/recommend/${city}`
    );

    return res.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      isApiError(error.response.data)
    ) {
      switch (error.response.data) {
        case ApiErrorCode.WEATHER_NOT_FOUND:
          toast.error("Weather not found");
          break;
        case ApiErrorCode.CITY_NOT_FOUND:
          toast.error("City not found");
          break;
        case ApiErrorCode.TOO_MANY_REQUESTS:
          toast.warning("Wow, slow down there");
          break;
      }
    }

    toast.error("An error occured");
  }

  return null;
};
