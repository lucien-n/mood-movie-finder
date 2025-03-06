import axios from "axios";
import { isApiError, RecommendResponse } from "common";
import { toast } from "sonner";
import { ApiError } from "common";

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
    if (isApiError(error))
      switch (error.body) {
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
