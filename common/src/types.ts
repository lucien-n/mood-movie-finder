export interface Genre {
  id: string;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  rating: number;
}

export interface Weather {
  main: {
    temp: number;
    humidity: number;
  };
  weather: { main: string; description: string }[];
}
