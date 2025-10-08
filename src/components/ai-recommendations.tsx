
import { getProductRecommendations } from "@/ai/flows/ai-product-recommendations";
import { mockProducts } from "@/lib/data";
import ProductCard from "./product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "./ui/separator";

interface AiRecommendationsProps {
  currentProductId: string;
}

export default async function AiRecommendations({
  currentProductId,
}: AiRecommendationsProps) {
  // In a real app, this data would come from the user's session or database
  const mockBrowsingHistory = [
    "product-1",
    "product-6",
    "product-9",
    currentProductId,
  ];
  const mockPastPurchases = ["product-1"];

  let recommendedProducts = [];

  try {
    const recommendations = await getProductRecommendations({
      userId: "user-2", // Mock user
      browsingHistory: mockBrowsingHistory,
      pastPurchases: mockPastPurchases,
    });

    if (recommendations && recommendations.recommendedProductIds) {
      recommendedProducts = mockProducts.filter((p) =>
        recommendations.recommendedProductIds.includes(p.id) && p.id !== currentProductId
      );
    }
  } catch (error) {
    console.error("Failed to get AI recommendations:", error);
    // Fallback to showing some random related products from the same category
    const currentProduct = mockProducts.find(p => p.id === currentProductId);
    if (currentProduct) {
        recommendedProducts = mockProducts
            .filter(p => p.category === currentProduct.category && p.id !== currentProductId)
            .slice(0, 4);
    }
  }

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
        <Separator />
        <h2 className="text-3xl font-headline font-bold tracking-tighter text-center">
            You Might Also Like
        </h2>
        <Carousel
            opts={{
            align: "start",
            loop: true,
            }}
            className="w-full"
        >
            <CarouselContent>
            {recommendedProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="p-1">
                        <ProductCard product={product} />
                    </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </div>
  );
}
