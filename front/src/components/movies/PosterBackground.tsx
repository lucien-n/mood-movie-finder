import Image from "next/image";

interface Props {
  posterPath: string;
  title: string;
}

export default function PosterBackground({ posterPath, title }: Props) {
  const src = `https://image.tmdb.org/t/p/w300${posterPath}`;

  return (
    <div>
      <Image
        src={src}
        alt=""
        className="absolute object-cover w-full h-full blur-md brightness-60"
        width={100}
        height={180}
      />
      <Image
        src={src}
        alt={`${title} poster`}
        className="absolute object-contain w-full h-full"
        width={200}
        height={355}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
