
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddToCartButton from "@/components/add-to-cart-button";
import AddToWishlistButton from "@/components/add-to-wishlist-button";
import { Star } from "lucide-react";
import AiRecommendations from "@/components/ai-recommendations";
import BuyNowButton from "@/components/buy-now-button";
import { Separator } from "@/components/ui/separator";
import ProductReviews from "@/components/product-reviews";
import { Card, CardContent } from "@/components/ui/card";
import ProductQuantityInput from './product-quantity-input';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square relative rounded-lg overflow-hidden border shadow-sm">
          <Image
            src={product.imageURL}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={product.imageHint}
          />
           <div className="absolute top-4 right-4">
            <AddToWishlistButton product={product} className="bg-background/50 hover:bg-background/80"/>
           </div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-headline font-bold mb-2">
            {product.name}
          </h1>
          <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
              {[...Array(5 - Math.floor(product.rating))].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-muted-foreground/30" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.rating.toFixed(1)} from {product.reviews.length} reviews)</span>
          </div>

          <p className="text-3xl font-semibold mb-6">₹{product.price.toFixed(2)}</p>
          <p className="text-foreground/80 leading-relaxed mb-6">
            {product.description}
          </p>

          <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Specifications</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                    {product.specifications.map(spec => (
                        <li key={spec.name} className="flex justify-between">
                            <span className="font-medium text-foreground/80">{spec.name}:</span>
                            <span>{spec.value}</span>
                        </li>
                    ))}
                </ul>
              </CardContent>
          </Card>
          
          <ProductQuantityInput product={product} />

        </div>
      </div>
      
      <Separator className="my-12 md:my-16" />

      <ProductReviews product={product} />

      <div className="mt-16 md:mt-24">
        <AiRecommendations currentProductId={product.id} />
      </div>
    </div>
  );
}

