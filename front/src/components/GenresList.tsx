import { useQuery } from "@tanstack/react-query";

export default function GenresList() {
  const { data, isPending } = useQuery({
    queryKey: ["genres"],
    queryFn: () =>
      fetch("http://localhost:3000/genres/").then((res) => res.json()),
  });
  return isPending ? "fetching genres" : <></>;
}
