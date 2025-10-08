
import type { Metadata } from "next";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import "./globals.css";
import MainNav from "@/components/main-nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "ShopStack | Modern E-commerce",
  description: "A full-stack e-commerce website built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          "flex flex-col"
        )}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <MainNav />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
