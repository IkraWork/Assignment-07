import Link from "next/link";
import ChangeBadge from "@/components/ChangeBadge";
import Emoji from "@/components/Emoji";
import { formatTaka } from "@/lib/format";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${encodeURIComponent(product.id)}`}
      className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="card-body gap-1 p-4">
        <Emoji value={product.emoji} className="text-4xl" />
        <h3 className="mt-1 text-base font-semibold">{product.name}</h3>
        <p className="text-sm text-base-content/60">{product.unit}</p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-lg font-bold text-primary">{formatTaka(product.price)}</p>
          </div>
          <ChangeBadge value={product.change} />
        </div>
      </div>
    </Link>
  );
}
