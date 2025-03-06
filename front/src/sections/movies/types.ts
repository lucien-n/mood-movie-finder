import { Movie } from "common";

export interface MovieProps extends Movie {
  isFavorite: boolean;
}
