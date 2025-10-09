
"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AddToWishlistButtonProps extends ButtonProps {
  product: Product;
  className?: string;
}

export default function AddToWishlistButton({
  product,
  className,
  ...props
}: AddToWishlistButtonProps) {
  const { addToWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  };

  return (
    <Button 
        onClick={handleToggleWishlist} 
        variant="ghost" 
        size="icon" 
        className={cn("text-muted-foreground hover:text-destructive", className)} 
        {...props}
    >
      <Heart className={cn("h-5 w-5", isWishlisted && "fill-destructive text-destructive")} />
      <span className="sr-only">Add to Wishlist</span>
    </Button>
  );
}
