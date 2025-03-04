export default interface Genre {
  id: string;
  name: string;
}

export default interface Movie {
  title: string;
  overview: string;
}

export default interface Weather {
  main: {
    temp: number;
    humidity: number;
  };
  weather: { main: string; description: string }[];
}
