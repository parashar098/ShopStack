
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

function ProductGrid() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const page = Number(searchParams.get('page')) || 1;
    const category = searchParams.get('category') || "all";
    const searchTerm = searchParams.get('search') || "";
    const sort = searchParams.get('sort') || "newest";
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice')); // Can be NaN

    useEffect(() => {
        setIsLoading(true);
        const fetchProducts = async () => {
            const priceRange = [minPrice, isNaN(maxPrice) ? 999999 : maxPrice];
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

        fetchProducts();
    }, [page, category, searchTerm, sort, minPrice, maxPrice]);
    
    const router = useRouter();
    const handlePageChange = useCallback((newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(newPage));
        router.replace(`/products?${params.toString()}`);
    }, [router, searchParams]);

    if (isLoading) {
        return (
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        )
    }

    return (
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
    );
}


export default function ProductsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [categories, setCategories] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState(10000);
    
    const currentCategory = searchParams.get('category') || "all";
    const currentSearchTerm = searchParams.get('search') || "";
    const currentSort = searchParams.get('sort') || "newest";
    const currentMinPrice = Number(searchParams.get('minPrice')) || 0;
    const currentMaxPrice = Number(searchParams.get('maxPrice'));

    useEffect(() => {
        const fetchInitialData = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories.map(c => c.name));
            const { products } = await getProducts(); // Get all to find max price
            setMaxPrice(Math.max(...products.map(p => p.price)));
        };
        fetchInitialData();
    }, []);

    const updateQuery = useCallback((newParams: Record<string, string | number | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.set(key, String(value));
            } else {
                params.delete(key);
            }
        });
        router.replace(`/products?${params.toString()}`);
    }, [router, searchParams]);
    
    const handleCategoryChange = (category: string) => updateQuery({ category: category === 'all' ? null : category, page: '1' });
    const handleSearchChange = (searchTerm: string) => updateQuery({ search: searchTerm || null, page: '1' });
    const handleSortChange = (sort: string) => updateQuery({ sort, page: '1' });
    const handlePriceChange = (priceRange: number[]) => updateQuery({ minPrice: priceRange[0], maxPrice: priceRange[1], page: '1' });

  return (
     <Suspense fallback={<div>Loading...</div>}>
        <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
            <ProductFilters
                categories={categories}
                onCategoryChange={handleCategoryChange}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
                onPriceChange={handlePriceChange}
                currentCategory={currentCategory}
                currentSearchTerm={currentSearchTerm}
                currentSort={currentSort}
                currentPriceRange={[currentMinPrice, isNaN(currentMaxPrice) ? maxPrice : currentMaxPrice]}
                maxPrice={maxPrice}
            />
            </aside>
            <main className="md:col-span-3">
            <h1 className="text-3xl font-headline font-bold tracking-tighter mb-8">
                {currentCategory === 'all' ? 'All Products' : currentCategory}
            </h1>
            <Suspense fallback={<p>Loading products...</p>}>
                <ProductGrid />
            </Suspense>
            </main>
        </div>
        </div>
    </Suspense>
  );
}

