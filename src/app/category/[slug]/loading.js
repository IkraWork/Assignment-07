import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-full" />
        <div className="skeleton h-8 w-48" />
      </div>
      <div className="mb-5 flex justify-end">
        <div className="skeleton h-10 w-52" />
      </div>
      <GridSkeleton count={8} />
      <p className="mt-6 text-center text-sm text-base-content/60">লোড হচ্ছে…</p>
    </div>
  );
}
