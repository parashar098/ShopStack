
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddToCartButton from "@/components/add-to-cart-button";
import BuyNowButton from "@/components/buy-now-button";
import { Plus, Minus } from "lucide-react";
import type { Product } from "@/lib/types";

export default function ProductQuantityInput({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stock, prev + amount)));
  };

  return (
    <>
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
      <div className="flex flex-col sm:flex-row gap-4">
        <AddToCartButton
          product={product}
          quantity={quantity}
          className="w-full sm:w-auto flex-1"
          size="lg"
        />
        <BuyNowButton
          product={product}
          quantity={quantity}
          className="w-full sm:w-auto flex-1"
          size="lg"
        />
      </div>
    </>
  );
}
