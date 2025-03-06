import { ChevronUp } from "lucide-react";

export default function SearchPrompt() {
  return (
    <div className="flex items-center gap-3 h-max overflow-hidden ml-2">
      <ChevronUp className="animate-bounce" />
      <h1 className="text-2xl">Start by searching for your city</h1>
    </div>
  );
}
