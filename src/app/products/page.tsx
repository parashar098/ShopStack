
"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { getProducts, getCategories } from "@/lib/api";
import ProductCard from "@/components/product-card";
import ProductFilters from "@/components/product-filters";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const PRODUCTS_PER_PAGE = 8;

function ProductsPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const page = Number(searchParams.get('page')) || 1;
    const category = searchParams.get('category') || "all";
    const searchTerm = searchParams.get('search') || "";
    const sort = searchParams.get('sort') || "newest";
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const currentMaxPrice = Number(searchParams.get('maxPrice')); // Can be NaN, which is fine for the check

    useEffect(() => {
        const fetchInitialData = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories.map(c => c.name));
            const { products: allProducts } = await getProducts(); // Get all to find max price
            const highestPrice = Math.max(...allProducts.map(p => p.price));
            setMaxPrice(highestPrice > 0 ? highestPrice : 10000);
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const fetchProducts = async () => {
            const effectiveMaxPrice = isNaN(currentMaxPrice) || currentMaxPrice === 0 ? maxPrice : currentMaxPrice;
            const priceRange = [minPrice, effectiveMaxPrice];

            const { products: fetchedProducts, totalPages: fetchedTotalPages } = await getProducts({ 
                page, 
                limit: PRODUCTS_PER_PAGE,
                category,
                searchTerm,
                sort,
                priceRange,
            });
            setProducts(fetchedProducts);
            setTotalPages(fetchedTotalPages);
            setIsLoading(false);
        };

        if (maxPrice > 0) { // Ensure maxPrice is loaded before fetching
             fetchProducts();
        }
    }, [page, category, searchTerm, sort, minPrice, currentMaxPrice, maxPrice]);

    const updateQuery = useCallback((newParams: Record<string, string | number | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '' && (key !== 'page' || Number(value) > 1)) {
                params.set(key, String(value));
            } else {
                params.delete(key);
            }
        });
        // Reset page to 1 for any filter change, except for pagination itself
        if (!('page' in newParams)) {
          params.set('page', '1');
        }

        router.replace(`/products?${params.toString()}`);
    }, [router, searchParams]);
    
    const handleCategoryChange = (cat: string) => updateQuery({ category: cat === 'all' ? null : cat });
    const handleSearchChange = (search: string) => updateQuery({ search: search || null });
    const handleSortChange = (s: string) => updateQuery({ sort: s });
    const handlePriceChange = (priceRange: number[]) => updateQuery({ minPrice: priceRange[0], maxPrice: priceRange[1] });
    const handlePageChange = (newPage: number) => updateQuery({ page: newPage });

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
                currentCategory={category}
                currentSearchTerm={searchTerm}
                currentSort={sort}
                currentPriceRange={[minPrice, isNaN(currentMaxPrice) ? maxPrice : currentMaxPrice]}
                maxPrice={maxPrice}
            />
            </aside>
            <main className="md:col-span-3">
            <h1 className="text-3xl font-headline font-bold tracking-tighter mb-8">
                {category === 'all' ? 'All Products' : category}
            </h1>
            
            {isLoading ? (
                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-64 w-full" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {products.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            <div className="flex justify-center items-center mt-12 space-x-4">
                                <Button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                                    Previous
                                </Button>
                                <span className="text-sm">
                                    Page {page} of {totalPages}
                                </span>
                                <Button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
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
                </>
            )}

            </main>
        </div>
        </div>
  );
}


export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-8 md:py-12">Loading products...</div>}>
            <ProductsPageContent />
        </Suspense>
    );
}

