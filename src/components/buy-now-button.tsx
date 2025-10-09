
"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Zap } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BuyNowButtonProps extends ButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  showIcon?: boolean;
}

export default function BuyNowButton({
  product,
  quantity = 1,
  className,
  showIcon = true,
  children = "Buy Now",
  ...props
}: BuyNowButtonProps) {
  const { addToCart, clearCart } = useCart();
  const router = useRouter();

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Clear the cart, add the single item, and go to checkout
    clearCart(true); // silent clear
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <Button onClick={handleBuyNow} className={cn("bg-yellow-500 hover:bg-yellow-600 text-black", className)} {...props}>
      {showIcon && <Zap className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  );
}
