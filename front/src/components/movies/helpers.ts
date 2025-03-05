export const getRatingBadgeColor = (rating: number) => {
  if (rating >= 4.0)
    return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200";
  if (rating >= 3.0)
    return "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200";
  return "bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-200";
};
