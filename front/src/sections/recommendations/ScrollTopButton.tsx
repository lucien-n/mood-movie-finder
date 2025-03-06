import { ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  onClick: () => void;
}

export default function ScrollToTopButton({ onClick }: Props) {
  return (
    <Button
      className="absolute bottom-8 cursor-pointer right-8 z-20 h-12 rounded-full group hover:bg-primary px-12"
      onClick={onClick}
    >
      <ChevronUp />
      <p className="group-hover:underline">Back to top</p>
    </Button>
  );
}
