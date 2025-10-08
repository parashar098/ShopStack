
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { mockProducts } from "@/lib/data";
import ProductCard from "@/components/product-card";
import ProductFilters from "@/components/product-filters";
import type { Product } from "@/lib/types";

function useProductFilters() {
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState({
        category: "all",
        searchTerm: searchParams.get('search') || "",
    });

    useEffect(() => {
        setFilters(prev => ({ ...prev, searchTerm: searchParams.get('search') || "" }));
    }, [searchParams]);


    const handleCategoryChange = (category: string) => {
        setFilters((prev) => ({ ...prev, category }));
    };

    const handleSearchChange = (searchTerm: string) => {
        setFilters((prev) => ({ ...prev, searchTerm }));
    };

    return { filters, handleCategoryChange, handleSearchChange };
}


export default function ProductsPage() {
  const { filters, handleCategoryChange, handleSearchChange } = useProductFilters();

  const categories = [...new Set(mockProducts.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const categoryMatch =
        filters.category === "all" || product.category === filters.category;
      const searchMatch = product.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <ProductFilters
            categories={categories}
            onCategoryChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
            currentSearchTerm={filters.searchTerm}
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
             <div className="text-center py-20 border-2 border-dashed rounded-lg">
                <h2 className="text-xl font-semibold">No Products Found</h2>
                <p className="mt-2 text-muted-foreground">
                    Try adjusting your search or filters.
                </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
