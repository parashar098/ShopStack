
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/lib/data";
import ProductCard from "@/components/product-card";

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 8);

  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
              Discover Your Next Favorite Thing
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              High-quality products curated just for you. Explore our collection and find what you've been looking for.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="#featured-products">Explore Products</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-products" className="py-16 md:py-24">
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
