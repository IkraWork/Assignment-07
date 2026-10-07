import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import Emoji from "@/components/Emoji";
import ErrorState from "@/components/ErrorState";
import { getCategories, getProduct } from "@/lib/api";
import { formatTaka } from "@/lib/format";
import { requireSession } from "@/lib/session";

function StatCard({ label, value, tone }) {
  return (
    <div className="rounded-box border border-base-300 bg-base-100 p-5">
      <p className="text-sm text-base-content/60">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${tone}`}>{value}</p>
    </div>
  );
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  await requireSession(`/product/${encodeURIComponent(decoded)}`);

  const [{ product, error }, categories] = await Promise.all([getProduct(decoded), getCategories()]);

  if (error) return <ErrorState />;
  if (!product) notFound();

  const tagNames = product.tags.map((t) => categories.find((c) => c.slug === t)?.name || t);

  return (
    <div className="space-y-8">
      <Link href="/" className="text-sm font-medium text-primary hover:underline">
        ← সব পণ্যে ফিরে যান
      </Link>

      <section className="rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <Emoji value={product.emoji} className="text-6xl" />
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              {product.description ? <p className="mt-1 max-w-xl text-base-content/70">{product.description}</p> : null}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {tagNames.map((t) => (
                  <span key={t} className="badge badge-primary badge-soft">
                    {t}
                  </span>
                ))}
                {product.unit ? <span className="badge badge-outline">{product.unit}</span> : null}
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-base-content/60">আজকের দাম</p>
            <p className="text-3xl font-bold text-primary">{formatTaka(product.price)}</p>
            <div className="mt-1">
              <ChangeBadge value={product.change} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="সর্বনিম্ন দাম" value={formatTaka(product.min)} tone="text-green-700" />
          <StatCard label="সর্বোচ্চ দাম" value={formatTaka(product.max)} tone="text-red-700" />
          <StatCard label="গড় দাম" value={formatTaka(product.avg)} tone="text-primary" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {product.markets.length ? (
          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
            <table className="table">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th className="text-right">দাম</th>
                  <th className="text-right">পরিবর্তন</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((m) => (
                  <tr key={m.name}>
                    <td className="font-medium">{m.name}</td>
                    <td className="text-right font-semibold">{formatTaka(m.price)}</td>
                    <td className="text-right">
                      <ChangeBadge value={m.change} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-box border border-dashed border-base-300 bg-base-100 p-6 text-center text-base-content/60">
            এই পণ্যের বাজারভিত্তিক দাম এখনো পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}
