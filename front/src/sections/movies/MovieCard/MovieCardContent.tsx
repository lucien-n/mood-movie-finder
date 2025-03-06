import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MovieCardContent({ children }: Props) {
  return (
    <div className="z-10 mt-auto flex flex-col justify-end p-4">
      <div className="space-y-2">{children}</div>
    </div>
  );
}
