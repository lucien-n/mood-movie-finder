import { useDelayedSearch } from "@/lib/hooks/useDelayedSearch";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onSearch: (search: string) => void;
  placeholder?: string;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, placeholder, isLoading }: Props) {
  const [search, setSearch] = useDelayedSearch(onSearch, "", 500);
  const iconClass = "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground";

  return (
    <div className="relative w-full sm:max-w-md lg:max-w-lg">
      {isLoading ? (
        <Loader2 className={cn(iconClass, "animate-spin")} />
      ) : (
        <Search className={iconClass} />
      )}
      <Input
        type="search"
        placeholder={placeholder}
        className="w-full pl-9 bg-background/80"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
