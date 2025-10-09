
"use client";

import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from "@/components/ui/toaster";
import type { ReactNode } from 'react';
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>
        {children}
        <Toaster />
      </CartProvider>
    </ThemeProvider>
  );
}
