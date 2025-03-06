import { MovieGenre } from "common";

import { Badge } from "@/components/ui/badge";
import { MOVIE_GENRE_LABEL } from "./types";

interface Props {
  genre: MovieGenre;
}

export default function GenreBadge({ genre }: Props) {
  return <Badge key={genre}>{MOVIE_GENRE_LABEL[genre]}</Badge>;
}
