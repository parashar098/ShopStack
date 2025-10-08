
"use client";

import { useState } from "react";
import { mockProducts } from "@/lib/data";
import ProductCard from "@/components/product-card";
import ProductFilters from "@/components/product-filters";
import type { Product } from "@/lib/types";

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  const categories = [...new Set(mockProducts.map((p) => p.category))];

  const handleFilterChange = (category: string) => {
    if (category === "all") {
      setFilteredProducts(mockProducts);
    } else {
      setFilteredProducts(mockProducts.filter((p) => p.category === category));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <ProductFilters
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </aside>
        <main className="md:col-span-3">
          <h1 className="text-3xl font-headline font-bold tracking-tighter mb-8">
            All Products
          </h1>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p>No products found for the selected filter.</p>
          )}
        </main>
      </div>
    </div>
  );
}
