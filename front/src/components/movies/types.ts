import { Movie } from "common";

export type MovieProps = Movie & {
  isFavorite: boolean;
};
