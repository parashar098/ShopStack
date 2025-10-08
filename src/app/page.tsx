
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/lib/data";
import ProductCard from "@/components/product-card";
import HeroCarousel from "@/components/hero-carousel";
import SplitText from "@/components/ui/split-text";
import CategoryHighlights from "@/components/category-highlights";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 8);
  const testimonials = [
    { name: "Sarah L.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", rating: 5, text: "The quality is outstanding, and the customer service was top-notch. I'll definitely be back for more!" },
    { name: "Mike D.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d", rating: 5, text: "I'm so impressed with my new desk. It's sturdy, stylish, and was surprisingly easy to assemble. Five stars!" },
    { name: "Jessica P.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d", rating: 4, text: "Fast shipping and the product was exactly as described. The backpack is now my daily go-to." }
  ];

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
            Our Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

       <section id="testimonials" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold tracking-tighter text-center mb-10">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col justify-between">
                <CardContent className="pt-6">
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-muted-foreground/50" />
                    ))}
                  </div>
                  <p className="text-foreground/80 italic">"{testimonial.text}"</p>
                </CardContent>
                <div className="flex items-center gap-4 p-4 border-t">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
