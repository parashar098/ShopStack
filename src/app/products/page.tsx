
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { mockProducts } from "@/lib/data";
import ProductCard from "@/components/product-card";
import ProductFilters from "@/components/product-filters";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

const PRODUCTS_PER_PAGE = 8;

function useProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || "all",
        searchTerm: searchParams.get('search') || "",
        sort: searchParams.get('sort') || "newest",
        priceRange: [
            Number(searchParams.get('minPrice')) || 0,
            Number(searchParams.get('maxPrice')) || Math.max(...mockProducts.map(p => p.price))
        ],
        page: Number(searchParams.get('page')) || 1,
    });
    
    const maxPrice = useMemo(() => Math.max(...mockProducts.map(p => p.price)), []);

    useEffect(() => {
        setFilters({
            category: searchParams.get('category') || "all",
            searchTerm: searchParams.get('search') || "",
            sort: searchParams.get('sort') || "newest",
            priceRange: [
                Number(searchParams.get('minPrice')) || 0,
                Number(searchParams.get('maxPrice')) || maxPrice
            ],
            page: Number(searchParams.get('page')) || 1,
        });
    }, [searchParams, maxPrice]);

    const updateQuery = useCallback((newParams: Record<string, string | number>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                params.set(key, String(value));
            } else {
                params.delete(key);
            }
        });
        router.replace(`/products?${params.toString()}`);
    }, [router, searchParams]);

    const handleCategoryChange = (category: string) => updateQuery({ category: category === 'all' ? '' : category, page: 1 });
    const handleSearchChange = (searchTerm: string) => updateQuery({ search: searchTerm, page: 1 });
    const handleSortChange = (sort: string) => updateQuery({ sort, page: 1 });
    const handlePriceChange = (priceRange: number[]) => updateQuery({ minPrice: priceRange[0], maxPrice: priceRange[1], page: 1 });
    const handlePageChange = (page: number) => updateQuery({ page });

    return { filters, handleCategoryChange, handleSearchChange, handleSortChange, handlePriceChange, handlePageChange, maxPrice };
}


export default function ProductsPage() {
  const { filters, handleCategoryChange, handleSearchChange, handleSortChange, handlePriceChange, handlePageChange, maxPrice } = useProductFilters();

  const categories = [...new Set(mockProducts.map((p) => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let products = mockProducts.filter((product) => {
      const categoryMatch =
        filters.category === "all" || product.category === filters.category;
      const searchMatch = product.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      return categoryMatch && searchMatch && priceMatch;
    });

    switch(filters.sort) {
        case 'price-asc':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
        default:
            // Assuming IDs are incremental and newer products have higher IDs.
            // In a real app, you'd use a createdAt timestamp.
            products.sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));
            break;
    }

    return products;
  }, [filters]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice(
      (filters.page - 1) * PRODUCTS_PER_PAGE,
      filters.page * PRODUCTS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <ProductFilters
            categories={categories}
            onCategoryChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            onPriceChange={handlePriceChange}
            currentCategory={filters.category}
            currentSearchTerm={filters.searchTerm}
            currentSort={filters.sort}
            currentPriceRange={filters.priceRange}
            maxPrice={maxPrice}
          />
        </aside>
        <main className="md:col-span-3">
          <h1 className="text-3xl font-headline font-bold tracking-tighter mb-8">
            {filters.category === 'all' ? 'All Products' : filters.category}
          </h1>
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="flex justify-center items-center mt-12 space-x-4">
                  <Button onClick={() => handlePageChange(filters.page - 1)} disabled={filters.page <= 1}>
                      Previous
                  </Button>
                  <span className="text-sm">
                      Page {filters.page} of {totalPages}
                  </span>
                  <Button onClick={() => handlePageChange(filters.page + 1)} disabled={filters.page >= totalPages}>
                      Next
                  </Button>
              </div>
            </>
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
