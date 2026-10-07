"use client";

import { useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";

export default function CategoryProducts({ products }) {
  const [order, setOrder] = useState("default");

  const sorted = useMemo(() => {
    if (order === "asc") return [...products].sort((a, b) => a.price - b.price);
    if (order === "desc") return [...products].sort((a, b) => b.price - a.price);
    return products;
  }, [products, order]);

  return (
    <>
      <div className="mb-5 flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-sm font-medium">
          সাজান:
        </label>
        <select
          id="sort"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="select select-bordered select-sm w-auto min-w-44 sm:select-md"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <ProductGrid products={sorted} />
    </>
  );
}
