import { GridSkeleton, SectionSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="space-y-12">
      <div className="skeleton h-64 w-full rounded-box" />
      <SectionSkeleton />
      <SectionSkeleton />
      <div className="space-y-4">
        <div className="skeleton h-7 w-40" />
        <GridSkeleton count={8} />
      </div>
    </div>
  );
}
