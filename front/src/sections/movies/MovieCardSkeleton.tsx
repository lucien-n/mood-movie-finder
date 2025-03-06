import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MovieCardSkeleton() {
  const base = "animate-pulse bg-primary/20 rounded-sm";

  return (
    <Card className="overflow-hidden flex aspect-[4/5] py-0">
      <div className="mt-auto h-full z-10 p-4 flex flex-col justify-end">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div className={cn(base, "h-5 w-32")}></div>
            <div className="flex items-center space-x-2">
              <div className={cn(base, "w-8 h-5 rounded-md")}></div>
              <div className={cn(base, "w-6 h-6")}></div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className={cn(base, "w-52 h-4")}></div>
            <div className={cn(base, "w-36 h-4")}></div>
            <div className={cn(base, "w-48 h-4")}></div>
          </div>
        </div>
      </div>
      <div className="mt-auto"></div>
    </Card>
  );
}
