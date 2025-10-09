
"use client";
import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddToCartButton from "@/components/add-to-cart-button";
import AddToWishlistButton from "@/components/add-to-wishlist-button";
import { Plus, Minus } from "lucide-react";
import AiRecommendations from "@/components/ai-recommendations";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [quantity, setQuantity] = useState(1);
  const product = mockProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stock, prev + amount)));
  };

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
          <p className="text-sm text-muted-foreground mb-4">{product.category}</p>
          <p className="text-3xl font-semibold mb-6">₹{product.price.toFixed(2)}</p>
          <p className="text-foreground/80 leading-relaxed mb-6">
            {product.description}
          </p>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 h-10 text-center border-0 focus-visible:ring-0"
                min="1"
                max={product.stock}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{product.stock} in stock</p>
          </div>
          <AddToCartButton
            product={product}
            quantity={quantity}
            className="w-full md:w-auto"
            size="lg"
          />
        </div>
      </div>
      <div className="mt-16 md:mt-24">
        <AiRecommendations currentProductId={product.id} />
      </div>
    </div>
  );
}
