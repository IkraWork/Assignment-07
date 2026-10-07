import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import ErrorState from "@/components/ErrorState";
import { getCategory, getProducts } from "@/lib/api";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const [category, { products, error }] = await Promise.all([getCategory(decoded), getProducts(decoded)]);

  if (error && !category) return <ErrorState />;
  if (!category && products.length === 0) notFound();

  const name = category?.name || decoded;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="text-4xl">{category?.emoji || "🛒"}</span>
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          {category?.description ? <p className="text-sm text-base-content/70">{category.description}</p> : null}
        </div>
      </div>

      {products.length ? (
        <CategoryProducts products={products} />
      ) : (
        <div className="rounded-box border border-base-300 bg-base-100 px-6 py-16 text-center">
          <p className="text-5xl">🧺</p>
          <h2 className="mt-3 text-xl font-semibold">এই বিভাগে এখনো কোনো পণ্য নেই</h2>
          <Link href="/" className="btn btn-primary mt-5">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </div>
  );
}
