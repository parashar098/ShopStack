
import type { Product } from "@/lib/types";
import { Star, StarHalf, UserCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";

interface ProductReviewsProps {
  product: Product;
}

const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
        {halfStar && <StarHalf key="half" className="h-5 w-5 text-yellow-400 fill-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground/30" />)}
      </div>
    );
};

const ratingDistribution = (reviews: Product['reviews']) => {
    const counts = [0,0,0,0,0];
    reviews.forEach(review => {
        counts[5 - review.rating]++;
    });
    return counts.map(count => (count / reviews.length) * 100);
}


export default function ProductReviews({ product }: ProductReviewsProps) {
  if (!product.reviews || product.reviews.length === 0) {
    return (
        <div className="py-8">
            <h2 className="text-2xl font-headline font-bold mb-6">Customer Reviews</h2>
            <p className="text-muted-foreground">No reviews yet for this product.</p>
        </div>
    );
  }

  const distribution = ratingDistribution(product.reviews);

  return (
    <div className="py-8">
      <h2 className="text-2xl font-headline font-bold mb-6">Customer Reviews</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Overall Rating</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-4xl font-bold">{product.rating.toFixed(1)}</span>
                        {renderStars(product.rating)}
                    </div>
                    <p className="text-sm text-muted-foreground">Based on {product.reviews.length} reviews</p>
                    <div className="space-y-2 mt-4">
                        {distribution.map((perc, i) => (
                             <div key={i} className="flex items-center gap-2 text-sm">
                                <span>{5-i} star</span>
                                <Progress value={perc} className="w-full" />
                                <span>{perc.toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2 space-y-6">
            {product.reviews.map((review) => (
                <Card key={review.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-3">
                            <UserCircle className="h-8 w-8 text-muted-foreground" />
                            <div>
                                <p className="font-semibold">{review.author}</p>
                                <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        {renderStars(review.rating)}
                    </CardHeader>
                    <CardContent>
                        <h4 className="font-semibold mb-2">{review.title}</h4>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
