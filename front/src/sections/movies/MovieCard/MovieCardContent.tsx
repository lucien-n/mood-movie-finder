import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MovieCardContent({ children }: Props) {
  return (
    <div className="mt-auto z-10 p-4 flex flex-col justify-end">
      <div className="space-y-2">{children}</div>
    </div>
  );
}
