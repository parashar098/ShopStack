
"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-headline font-bold tracking-tighter mb-8">
        Your Wishlist
      </h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Add your favorite items to your wishlist to keep track of them.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
