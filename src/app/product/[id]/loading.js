export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="skeleton h-4 w-32" />
      <div className="skeleton h-44 w-full rounded-box" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="skeleton h-24 rounded-box" />
        <div className="skeleton h-24 rounded-box" />
        <div className="skeleton h-24 rounded-box" />
      </div>
      <div className="skeleton h-64 w-full rounded-box" />
    </div>
  );
}
