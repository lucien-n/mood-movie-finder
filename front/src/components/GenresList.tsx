import { useQuery } from "@tanstack/react-query";
import { Genre } from "common/dist/types";

export default function GenresList() {
  const { data, isPending } = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: () =>
      fetch("http://localhost:3000/api/genres/").then((res) => res.json()),
  });

  if (isPending) return "Fetching genres";

  return data ? (
    <ul>
      {data.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  ) : (
    "No results"
  );
}
