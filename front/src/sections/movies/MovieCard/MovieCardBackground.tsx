import Image from "next/image";

interface Props {
  posterPath: string;
  title: string;
}

export default function MovieCardBackground({ posterPath, title }: Props) {
  const src = `https://image.tmdb.org/t/p/w300${posterPath}`;

  return (
    <div>
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={src}
          alt={`${title} backdrop`}
          className="size-full object-cover blur-md brightness-60"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={50}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Image
          src={src}
          alt={`${title} poster`}
          className="size-full object-contain"
          fill
          sizes="(max-width: 768px) 50vw, 200px"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </div>
  );
}
