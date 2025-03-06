import { ChevronUp } from "lucide-react";

export default function SearchPrompt() {
  return (
    <div className="ml-2 flex h-max items-center gap-3 overflow-hidden">
      <ChevronUp className="animate-bounce" />
      <h1 className="text-2xl">Start by searching for your city</h1>
    </div>
  );
}
