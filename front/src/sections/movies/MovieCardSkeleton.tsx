import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MovieCardSkeleton() {
  const base = "animate-pulse bg-primary/20 rounded-sm";

  return (
    <Card className="flex aspect-[4/5] overflow-hidden py-0">
      <div className="z-10 mt-auto flex h-full flex-col justify-end p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className={cn(base, "h-5 w-32")}></div>
            <div className="flex items-center space-x-2">
              <div className={cn(base, "h-5 w-8 rounded-md")}></div>
              <div className={cn(base, "h-6 w-6")}></div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className={cn(base, "h-4 w-52")}></div>
            <div className={cn(base, "h-4 w-36")}></div>
            <div className={cn(base, "h-4 w-48")}></div>
          </div>
        </div>
      </div>
      <div className="mt-auto"></div>
    </Card>
  );
}
