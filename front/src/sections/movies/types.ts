import { Movie, MovieGenre } from "common";

export interface MovieProps extends Movie {
  isFavorite: boolean;
}

export const MOVIE_GENRE_LABEL: Record<MovieGenre, string> = {
  [MovieGenre.ACTION]: "Action",
  [MovieGenre.ADVENTURE]: "Adventure",
  [MovieGenre.ANIMATION]: "Animation",
  [MovieGenre.COMEDY]: "Comedy",
  [MovieGenre.CRIME]: "Crime",
  [MovieGenre.DOCUMENTARY]: "Documentary",
  [MovieGenre.DRAMA]: "Drama",
  [MovieGenre.FAMILY]: "Family",
  [MovieGenre.FANTASY]: "Fantasy",
  [MovieGenre.HISTORY]: "History",
  [MovieGenre.HORROR]: "Horror",
  [MovieGenre.MUSIC]: "Music",
  [MovieGenre.MYSTERY]: "Mystery",
  [MovieGenre.ROMANCE]: "Romance",
  [MovieGenre.SCIENCE_FICTION]: "Science Fiction",
  [MovieGenre.TV_MOVIE]: "TV Movie",
  [MovieGenre.THRILLER]: "Thriller",
  [MovieGenre.WAR]: "War",
  [MovieGenre.WESTERN]: "Western",
};
