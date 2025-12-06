"use client";

import React, { useEffect, useState } from "react";
import RollingGallery from "@/components/ui/rolling-gallery";

export default function GalleryClient() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL ?? "";
        const url = base ? `${base}/api/products?limit=100` : `/api/products?limit=100`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        const productImages = (data.products || [])
          .map((p: any) => p.image)
          .filter((img: string) => img && img.trim() !== "");
        if (mounted) setImages(productImages);
      } catch (err) {
        console.error("GalleryClient: failed to fetch products", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading || images.length === 0) {
    return null; // Don't render gallery if no images
  }

  return <RollingGallery images={images} autoplay={true} pauseOnHover={true} />;
}
