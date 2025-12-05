
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Menu,
  Heart,
  User,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Searchbar from "./search-bar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "./ui/dropdown-menu";

export default function MainNav() {
  const { itemCount: cartItemCount } = useCart();
  const { itemCount: wishlistItemCount } = useWishlist();
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const isAdminPage = pathname.startsWith('/admin');

  const navLinks = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/products", label: "Products", active: pathname.startsWith("/products") },
    { href: "/about", label: "About", active: pathname === "/about" },
    { href: "/contact", label: "Contact", active: pathname === "/contact" },
  ];

  if (isAdminPage) {
    return null;
  }
  
  const handleLogout = () => {
    logout();
    router.push('/');
  }

  const UserMenu = () => {
    if (isLoading) {
      return null; // Or a skeleton loader
    }
    
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="hidden md:flex items-center space-x-2">
        <Button variant="ghost" asChild>
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Menu Trigger */}
        <div className="md:hidden mr-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              <SheetHeader>
                 <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Image src="/logo.svg" alt="ShopStack" width={40} height={40} className="h-10 w-10" />
                  <span className="font-bold font-headline">ShopStack</span>
                </Link>
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={cn("hover:text-foreground/80", link.active ? "text-foreground" : "text-foreground/60")}>{link.label}</Link>
                ))}
                <div className="mt-4">
                  <Searchbar />
                </div>
                <div className="flex items-center gap-4 mt-4">
                 {user ? (
                    <Button onClick={() => { handleLogout(); setOpen(false); }}>Logout</Button>
                  ) : (
                    <>
                      <Button variant="ghost" asChild onClick={() => setOpen(false)}>
                        <Link href="/login">Sign In</Link>
                      </Button>
                      <Button asChild onClick={() => setOpen(false)}>
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Desktop Logo & Links */}
        <Link href="/" className="items-center space-x-2 hidden md:flex">
            <Image src="/logo.svg" alt="ShopStack" width={40} height={40} className="h-10 w-10" />
            <span className="font-bold font-headline text-lg">ShopStack</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={cn("transition-colors hover:text-foreground/80", link.active ? "text-foreground" : "text-foreground/60")}>
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* Mobile Logo (centered) */}
        <div className="flex-1 flex justify-center md:hidden">
           <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="ShopStack" width={40} height={40} className="h-10 w-10" />
              <span className="font-bold font-headline text-lg">ShopStack</span>
          </Link>
        </div>


        {/* Actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden sm:block w-full max-w-xs">
            <Searchbar />
          </div>
          <div className="flex items-center gap-1">
             <ThemeToggle />
             <div className="relative">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>
              {isClient && wishlistItemCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground transform translate-x-1/2 -translate-y-1/2">
                  {wishlistItemCount}
                </span>
              )}
            </div>
            <div className="relative">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Shopping Cart</span>
                </Link>
              </Button>
              {isClient && cartItemCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground transform translate-x-1/2 -translate-y-1/2">
                  {cartItemCount}
                </span>
              )}
            </div>
             <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
