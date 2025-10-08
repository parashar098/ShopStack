
"use client";

import { usePathname } from 'next/navigation';
import { Package2, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <footer className="bg-secondary mt-auto text-foreground/80">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Package2 className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg text-foreground">ShopStack</span>
            </Link>
            <p className="text-sm">
              Your one-stop shop for high-quality, curated products. Discover your next favorite thing with us.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
              <Link href="#" className="hover:text-primary transition-colors">About Us</Link>
              <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
              <Link href="#" className="hover:text-primary transition-colors">FAQs</Link>
            </nav>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Customer Support</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="#" className="hover:text-primary transition-colors">Track Order</Link>
              <Link href="#" className="hover:text-primary transition-colors">Returns & Refunds</Link>
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            </nav>
          </div>
          
          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact Info</h4>
             <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    <span>123 Market St, San Francisco, CA 94103</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-primary" />
                    <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-primary" />
                    <span>support@shopstack.com</span>
                </div>
            </div>
            <h4 className="font-semibold text-foreground pt-4">Newsletter</h4>
            <p className="text-sm">Stay up to date with our latest news and offers.</p>
            <form className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email" className="bg-background" />
                <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ShopStack. All rights reserved. Designed by AI.</p>
        </div>
      </div>
    </footer>
  );
}
