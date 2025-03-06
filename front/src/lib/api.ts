import axios from "axios";
import { ApiError, isApiError, RecommendResponse } from "common";
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
    )
      switch (error.response.data) {
        case ApiError.CityNotFound:
          toast.error("City not found");
          break;
        case ApiError.RateLimit:
          toast.warning("Wow, slow down there");
          break;
        default:
          toast.error("An error occured");
      }
  }

  return null;
};
