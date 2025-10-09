
"use client";

import type { Product, WishlistItem } from "@/lib/types";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useToast } from "@/hooks/use-toast";

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("shopstack_wishlist");
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      try {
        localStorage.setItem("shopstack_wishlist", JSON.stringify(wishlistItems));
      } catch (error) {
        console.error("Failed to save wishlist to localStorage", error);
      }
    }
  }, [wishlistItems, isInitialLoad]);

  const addToWishlist = useCallback(
    (product: Product) => {
      setWishlistItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          return prevItems; // Already in wishlist
        }
        toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
        return [...prevItems, product];
      });
    },
    [toast]
  );

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((prevItems) => {
        const itemToRemove = prevItems.find(item => item.id === productId);
        if(itemToRemove) {
            toast({
                title: "Removed from Wishlist",
                description: `${itemToRemove.name} has been removed from your wishlist.`,
            });
        }
        return prevItems.filter((item) => item.id !== productId)
    });
  }, [toast]);
  
  const toggleWishlist = useCallback((product: Product) => {
      setWishlistItems((prevItems) => {
          const existingItem = prevItems.find((item) => item.id === product.id);
          if (existingItem) {
              toast({
                title: "Removed from Wishlist",
                description: `${product.name} has been removed from your wishlist.`,
              });
              return prevItems.filter((item) => item.id !== product.id);
          } else {
              toast({
                title: "Added to Wishlist",
                description: `${product.name} has been added to your wishlist.`,
              });
              return [...prevItems, product];
          }
      })
  }, [toast]);

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlistItems.some((item) => item.id === productId);
    },
    [wishlistItems]
  );

  const itemCount = wishlistItems.length;

  const value = {
    wishlistItems,
    addToWishlist: toggleWishlist,
    removeFromWishlist,
    isInWishlist,
    itemCount
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
