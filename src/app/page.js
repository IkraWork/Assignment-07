import ErrorState from "@/components/ErrorState";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";

function Section({ title, subtitle, id, products, emptyText }) {
  return (
    <section id={id} className="scroll-mt-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle ? <p className="text-sm text-base-content/70">{subtitle}</p> : null}
      </div>
      {products.length ? (
        <ProductGrid products={products} />
      ) : (
        <p className="rounded-box border border-dashed border-base-300 bg-base-100 p-6 text-center text-base-content/60">
          {emptyText}
        </p>
      )}
    </section>
  );
}

export default async function HomePage() {
  const { products, error } = await getProducts();

  if (error) {
    return (
      <div className="space-y-10">
        <Hero />
        <ErrorState />
      </div>
    );
  }

  const risers = products
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <div className="space-y-12">
      <Hero />
      <Section title="আজ দাম বেড়েছে ▲" subtitle="সবচেয়ে বেশি দাম বাড়া ৬টি পণ্য" products={risers} emptyText="আজ কোনো পণ্যের দাম বাড়েনি।" />
      <Section title="আজ দাম কমেছে ▼" subtitle="সবচেয়ে বেশি দাম কমা ৬টি পণ্য" products={fallers} emptyText="আজ কোনো পণ্যের দাম কমেনি।" />
      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="যেকোনো পণ্যে ক্লিক করে বাজারভিত্তিক দাম দেখুন"
        products={products}
        emptyText="কোনো পণ্য পাওয়া যায়নি।"
      />
    </div>
  );
}
