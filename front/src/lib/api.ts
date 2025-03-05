import axios from "axios";
import { isApiError, RecommendResponse } from "common";
import { toast } from "sonner";
import { API_BASE_URL } from "./constants";
import { ApiError } from "common";

export const getRecommendation = async (
  city: string
): Promise<RecommendResponse | undefined> => {
  try {
    const res = await axios.get<RecommendResponse>(
      `${API_BASE_URL}/recommend/${city}`
    );

    return res.data;
  } catch (error) {
    if (isApiError(error))
      switch (error.body) {
        case ApiError.CityNotFound:
          toast.error("City not found");
          return;
        case ApiError.RateLimit:
          toast.warning("Wow, slow down there");
          return;
      }

    toast.error("An error occured");
  }
};
