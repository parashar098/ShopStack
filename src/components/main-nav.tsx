
"use client";

import Link from "next/link";
import {
  Package2,
  ShoppingCart,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Searchbar from "./search-bar";
import { ThemeToggle } from "./theme-toggle";

export default function MainNav() {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">ShopStack</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Home
            </Link>
             <Link
              href="/products"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/products") ? "text-foreground" : "text-foreground/60"
              )}
            >
              Products
            </Link>
             <Link
              href="/about"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/about" ? "text-foreground" : "text-foreground/60"
              )}
            >
              About
            </Link>
             <Link
              href="/contact"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/contact" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between md:justify-end gap-4">
            <div className="w-full md:w-auto md:flex-1 md:max-w-xs">
                <Searchbar />
            </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="relative">
              <Button variant="ghost" size="icon" asChild>
                  <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Shopping Cart</span>
                  </Link>
              </Button>
              {isClient && itemCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground transform translate-x-1/2 -translate-y-1/2">
                  {itemCount}
                  </span>
              )}
            </div>
            <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                    <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                    <Link href="/register">Sign Up</Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
