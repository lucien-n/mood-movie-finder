export interface TMDBMovieResponse {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
}
