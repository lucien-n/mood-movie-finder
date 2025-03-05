import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  overview: string;
}

export default function CollapsibleOverview({ overview }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleIsExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className="text-sm text-gray-200 cursor-pointer"
      onClick={handleToggleIsExpanded}
    >
      <div
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden line-clamp-[9]",
          isExpanded ? "max-h-[13em]" : "max-h-[3em]"
        )}
      >
        <p>{overview}</p>
      </div>
      <div className="flex items-center mt-1 text-gray-400 hover:text-gray-200">
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4 mr-1" />
            <span className="text-xs">Show less</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4 mr-1" />
            <span className="text-xs">Show more</span>
          </>
        )}
      </div>
    </div>
  );
}
