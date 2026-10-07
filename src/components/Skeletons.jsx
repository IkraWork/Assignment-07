export function CardSkeleton() {
  return (
    <div className="card border border-base-300 bg-base-100 p-4">
      <div className="skeleton h-10 w-10 rounded-full" />
      <div className="skeleton mt-3 h-5 w-3/4" />
      <div className="skeleton mt-2 h-4 w-1/3" />
      <div className="mt-4 flex items-end justify-between">
        <div className="skeleton h-8 w-24" />
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-7 w-56" />
      <GridSkeleton count={4} />
    </div>
  );
}
