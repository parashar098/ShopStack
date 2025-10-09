
import { notFound } from "next/navigation";
import { mockOrders, mockProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function OrderConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const order = mockOrders.find((o) => o.id === params.id);

  if (!order) {
    // In a real app, you would fetch from the DB.
    // For this mock, we'll just show not found if it's not in our temporary array.
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-headline">Thank You For Your Order!</CardTitle>
          <p className="text-muted-foreground">Your order #{order.id} has been placed successfully.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <h3 className="font-semibold">Order Summary</h3>
          <div className="space-y-3">
            {order.items.map(item => {
              const product = mockProducts.find(p => p.id === item.productId);
              return (
                 <div key={item.productId} className="flex justify-between items-center text-sm">
                    <span>{product?.name ?? 'Unknown Product'} x {item.quantity}</span>
                    <span className="text-muted-foreground">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              )
            })}
          </div>
          <Separator />
           <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Shipping To</h3>
            <div className="text-sm text-muted-foreground">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
            </div>
          </div>
           <Button asChild size="lg" className="w-full mt-6">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
