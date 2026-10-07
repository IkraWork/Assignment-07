import Emoji from "@/components/Emoji";
import { bnNumber, formatPercent } from "@/lib/format";

function TickerItem({ p }) {
  const tone = p.change > 0 ? "text-green-300" : p.change < 0 ? "text-red-300" : "text-gray-300";
  const arrow = p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—";
  return (
    <span className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-sm">
      <Emoji value={p.emoji} className="text-base [&]:h-5 [&]:w-5" />
      <span className="font-medium">{p.name}</span>
      <span>
        {bnNumber(p.price)} টাকা{p.unit ? `/${p.unit.replace("প্রতি ", "")}` : ""}
      </span>
      <span className={`font-semibold ${tone}`}>
        {arrow} {formatPercent(p.change)}
      </span>
    </span>
  );
}

export default function Ticker({ products }) {
  if (!products.length) return null;
  return (
    <div className="marquee overflow-hidden bg-neutral py-2 text-neutral-content" aria-label="আজকের দামের তালিকা">
      <div className="marquee-track">
        {[0, 1].map((n) => (
          <div key={n} className="flex" aria-hidden={n === 1}>
            {products.map((p) => (
              <TickerItem key={`${n}-${p.id}`} p={p} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
