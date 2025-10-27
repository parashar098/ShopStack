
"use client";

import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { useRef } from "react";
import SplitText from "./ui/split-text";

type CarouselItemType = {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  imageHint: string;
  link: string;
};

interface HeroCarouselProps {
  items: CarouselItemType[];
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative w-full h-[60vh] md:h-[80vh]">
              <Image
                src={item.imageURL}
                alt={item.title}
                fill
                className="object-cover"
                data-ai-hint={item.imageHint}
                priority
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white p-4">
                  <div className="max-w-3xl">
                    <SplitText
                        text={item.title}
                        tag="h1"
                        className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl !text-white"
                    />
                    <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/80">
                        {item.description}
                    </p>
                    <Button asChild size="lg" className="mt-8">
                        <Link href={item.link}>Shop Now</Link>
                    </Button>
                  </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
    </Carousel>
  );
}
