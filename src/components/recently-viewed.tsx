
"use client";

import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { mockProducts } from "@/lib/data";
import ProductCard from "./product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "./ui/separator";

export default function RecentlyViewed() {
  const { recentlyViewedIds } = useRecentlyViewed();

  const recentlyViewedProducts = mockProducts.filter((p) =>
    recentlyViewedIds.includes(p.id)
  );

  if (recentlyViewedProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      <Separator />
      <h2 className="text-2xl font-headline font-bold tracking-tighter text-center">
        Recently Viewed Products
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recentlyViewedProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </div>
  );
}
