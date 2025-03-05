import { getPosterUrl } from "./helpers";

interface Props {
  posterPath: string;
  title: string;
}

export default function PosterBackground({ posterPath, title }: Props) {
  return (
    <div className="">
      <img
        src={getPosterUrl(posterPath, 200)}
        alt=""
        className="absolute object-cover w-full h-full blur-md brightness-60"
      />
      <img
        src={getPosterUrl(posterPath, 400)}
        alt={`${title} poster`}
        className="absolute object-contain w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
