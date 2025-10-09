
"use client";

import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from "@/components/ui/toaster";
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
      <CartProvider>
        {children}
        <Toaster />
      </CartProvider>
  );
}
