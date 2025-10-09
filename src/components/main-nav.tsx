
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
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

export default function MainNav() {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  const navLinks = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/products", label: "Products", active: pathname.startsWith("/products") },
    { href: "/about", label: "About", active: pathname === "/about" },
    { href: "/contact", label: "Contact", active: pathname === "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">ShopStack</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={cn("transition-colors hover:text-foreground/80", link.active ? "text-foreground" : "text-foreground/60")}>
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden sm:block w-full max-w-xs">
            <Searchbar />
          </div>
          <div className="flex items-center gap-2">
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
            <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs">
                        <nav className="grid gap-6 text-lg font-medium mt-8">
                          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-lg font-semibold mb-4">
                              <Package2 className="h-6 w-6 text-primary" />
                              <span className="font-bold font-headline">ShopStack</span>
                          </Link>
                          {navLinks.map(link => (
                             <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={cn("hover:text-foreground/80", link.active ? "text-foreground" : "text-foreground/60")}>{link.label}</Link>
                          ))}
                          <div className="mt-4">
                              <Searchbar />
                          </div>
                          <div className="flex items-center gap-4 mt-4">
                              <Button variant="ghost" asChild onClick={() => setOpen(false)}>
                                  <Link href="/login">Sign In</Link>
                              </Button>
                              <Button asChild onClick={() => setOpen(false)}>
                                  <Link href="/register">Sign Up</Link>
                              </Button>
                          </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
