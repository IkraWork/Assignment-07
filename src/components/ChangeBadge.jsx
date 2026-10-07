import { formatPercent } from "@/lib/format";

export default function ChangeBadge({ value }) {
  if (value > 0) {
    return <span className="badge badge-sm bg-green-100 text-green-700 border-green-200 font-semibold">▲ {formatPercent(value)}</span>;
  }
  if (value < 0) {
    return <span className="badge badge-sm bg-red-100 text-red-700 border-red-200 font-semibold">▼ {formatPercent(value)}</span>;
  }
  return <span className="badge badge-sm bg-gray-100 text-gray-600 border-gray-200 font-semibold">— {formatPercent(0)}</span>;
}
