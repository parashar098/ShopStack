"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/product-card";
import type { Product } from "@/lib/types";

type Props = {
  limit?: number;
};

export default function FeaturedProductsClient({ limit = 8 }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL ?? "";
        const url = base ? `${base}/api/products?limit=${limit}` : `/api/products?limit=${limit}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        const mapped: Product[] = (data.products || []).map((p: any) => ({
          id: p._id,
          name: p.name,
          description: p.description,
          price: p.price,
          imageURL: p.image,
          category: p.category,
          stock: p.countInStock,
          imageHint: p.category?.toLowerCase(),
          rating: p.rating || 0,
          reviews: [],
          specifications: [],
        }));
        if (mounted) setProducts(mapped);
      } catch (err) {
        console.error("FeaturedProductsClient: failed to fetch products", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, [limit]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center py-8">Loading featured products…</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center py-8">No featured products available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
