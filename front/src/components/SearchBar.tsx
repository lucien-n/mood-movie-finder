import { useDelayedSearch } from "@/lib/hooks/useDelayedSearch";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  onSearch: (search: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder }: Props) {
  const [search, setSearch] = useDelayedSearch(onSearch, "");

  return (
    <div className="relative w-full max-w-md lg:max-w-lg">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground " />
      <Input
        type="search"
        placeholder={placeholder}
        className="w-full pl-9 text-lg!"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
