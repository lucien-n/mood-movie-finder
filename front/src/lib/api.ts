import axios from "axios";
import { RecommendResponse } from "common";
import { toast } from "sonner";
import { API_BASE_URL } from "./constants";

export const getRecommendation = async (
  city: string
): Promise<RecommendResponse | undefined> => {
  try {
    const res = await axios.get<RecommendResponse>(
      `${API_BASE_URL}/recommend/${city}`
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.status === 404) {
        toast.error("City not found");
        return;
      }
    }

    toast.error("An error occured");
  }
};
