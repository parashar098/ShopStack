
"use client";

import { useCart } from "@/hooks/use-cart";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps extends ButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className,
  showIcon = true,
  children = "Add to Cart",
  ...props
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, quantity);
  };

  return (
    <Button onClick={handleAddToCart} className={cn(className)} {...props}>
      {showIcon && <ShoppingCart className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  );
}
