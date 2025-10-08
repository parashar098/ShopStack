
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/lib/data";
import ProductCard from "@/components/product-card";
import HeroCarousel from "@/components/hero-carousel";
import SplitText from "@/components/ui/split-text";
import CategoryHighlights from "@/components/category-highlights";

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 8);

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <HeroCarousel products={mockProducts} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <SplitText
              text="Discover Your Next Favorite Thing"
              tag="h1"
              className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl !text-white"
            />
            <p className="mt-4 text-lg md:text-xl text-white/80">
              High-quality products curated just for you. Explore our collection and find what you've been looking for.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CategoryHighlights />

      <section id="featured-products" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold tracking-tighter text-center mb-10">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
