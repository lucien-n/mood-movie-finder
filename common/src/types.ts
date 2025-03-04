export interface Genre {
  id: string;
  name: string;
}

export interface Movie {
  title: string;
  overview: string;
}

export interface Weather {
  main: {
    temp: number;
    humidity: number;
  };
  weather: { main: string; description: string }[];
}
