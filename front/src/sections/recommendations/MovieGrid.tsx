interface Props {
  children: React.ReactNode;
}

export default function MovieGrid({ children }: Props) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}
