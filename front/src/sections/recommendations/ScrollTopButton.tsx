import { ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  onClick: () => void;
}

export default function ScrollToTopButton({ onClick }: Props) {
  return (
    <Button
      className="group hover:bg-primary absolute right-8 bottom-8 z-20 h-12 cursor-pointer rounded-full px-12"
      onClick={onClick}
    >
      <ChevronUp />
      <p className="group-hover:underline">Back to top</p>
    </Button>
  );
}
