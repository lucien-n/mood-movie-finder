import { Loader2, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useDelayedSearch } from "@/lib/hooks/useDelayedSearch";
import { cn } from "@/lib/utils";

interface Props {
  onSearch: (search: string) => void;
  placeholder?: string;
  loading: boolean;
}

export default function SearchBar({ onSearch, placeholder, loading }: Props) {
  const [search, setSearch] = useDelayedSearch(onSearch, "", 500);
  const iconClass =
    "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5";

  return (
    <div className="flex-1">
      <div className="relative">
        <Input
          placeholder={placeholder}
          value={search}
          // onChange={(e) => setSearch(e.target.value)}
          onInput={(e) => setSearch(e.currentTarget.value)}
          className="pr-10"
          onKeyDown={(e) => e.key === "Enter" && onSearch(search)}
        />
        {loading ? (
          <Loader2 className={cn(iconClass, "animate-spin")} />
        ) : (
          <button onClick={() => onSearch(search)} className={iconClass}>
            <Search className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}
