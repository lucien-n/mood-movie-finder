export const getRatingColor = (rating: number) => {
  if (rating >= 4) return "bg-green-500/30 text-green-500";
  if (rating >= 3) return "bg-yellow-500/30 text-yellow-500";
  return "bg-red-500/30 text-red-500";
};
