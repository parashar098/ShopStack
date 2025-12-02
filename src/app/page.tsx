
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, getProductById, getProducts } from "@/lib/api";
import ProductCard from "@/components/product-card";
import SplitText from "@/components/ui/split-text";
import CategoryHighlights from "@/components/category-highlights";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Counter from "@/components/ui/counter";
import RollingGallery from "@/components/ui/rolling-gallery";
import type { Product } from "@/lib/types";
import HeroCarousel from "@/components/hero-carousel";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);
  // Get first product from featured products instead of trying to fetch specific ID
  const discountProduct = featuredProducts.length > 0 ? featuredProducts[0] : null;
  const { products: allProducts } = await getProducts();
  const galleryImages = allProducts.map(p => p.imageURL);
  
  const heroCombos = [
    {
      id: 'combo-1',
      title: 'Ultimate Tech Bundle',
      description: 'Get the best of our electronics with this exclusive combo deal. Limited time only!',
      imageURL: 'https://images.unsplash.com/photo-1550009158-94ae76552485?q=80&w=1287&auto=format&fit=crop',
      imageHint: 'tech bundle',
      link: '/products?category=Electronics'
    },
    {
      id: 'combo-2',
      title: 'Seasonal Fashion Picks',
      description: 'Upgrade your wardrobe with our latest collection of trendy apparel and accessories.',
      imageURL: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1171&auto=format&fit=crop',
      imageHint: 'fashion collection',
      link: '/products?category=Fashion'
    },
    {
      id: 'combo-3',
      title: 'Cozy Home Makeover',
      description: 'Everything you need to transform your living space into a comfortable and stylish sanctuary.',
      imageURL: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1227&auto=format&fit=crop',
      imageHint: 'stylish living room',
      link: '/products?category=Home'
    }
  ];

  const testimonials = [
    { name: "Sarah L.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", rating: 5, text: "The quality is outstanding, and the customer service was top-notch. I'll definitely be back for more!" },
    { name: "Mike D.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d", rating: 5, text: "I'm so impressed with my new desk. It's sturdy, stylish, and was surprisingly easy to assemble. Five stars!" },
    { name: "Jessica P.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d", rating: 4, text: "Fast shipping and the product was exactly as described. The backpack is now my daily go-to." }
  ];
  
  const stats = [
    { value: 1200, label: "Happy Customers" },
    { value: 5000, label: "Products Shipped" },
    { value: 98, label: "Positive Reviews (%)" }
  ];

  return (
    <div className="flex flex-col">
       <section className="w-full">
        <HeroCarousel items={heroCombos} />
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

      {discountProduct && (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-8 items-center bg-primary text-primary-foreground rounded-lg overflow-hidden p-8">
                    <div className="relative aspect-square">
                        <Image
                            src={discountProduct.imageURL}
                            alt={discountProduct.name}
                            fill
                            className="object-cover rounded-md"
                            data-ai-hint={discountProduct.imageHint}
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-headline font-bold tracking-tighter mb-2">Limited Time Offer!</h2>
                        <p className="text-lg text-primary-foreground/80 mb-4">Get 20% off on the {discountProduct.name}</p>
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-4xl font-bold">₹{(discountProduct.price * 0.8).toFixed(2)}</span>
                            <span className="text-xl line-through text-primary-foreground/60">₹{discountProduct.price.toFixed(2)}</span>
                        </div>
                        <p className="mb-6 text-primary-foreground/90">{discountProduct.description}</p>
                        <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                           <Link href={`/products/${discountProduct.id}`}>Shop Now</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
      )}
      
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-headline font-bold tracking-tighter mb-10">
                A Glimpse of Our Collection
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-10">
                Explore the variety and quality that defines our brand. Each product is selected with an eye for design, durability, and delight.
            </p>
        </div>
        <RollingGallery images={galleryImages} autoplay={true} pauseOnHover={true} />
      </section>

      <section id="our-impact" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold tracking-tighter text-center mb-10">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <Counter
                  value={stat.value}
                  fontSize={60}
                  padding={5}
                  gap={15}
                  textColor="hsl(var(--primary))"
                  fontWeight={700}
                  gradientFrom="hsl(var(--background))"
                  gradientTo="transparent"
                />
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       <section id="testimonials" className="py-16 md:py-24 bg-secondary">
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
