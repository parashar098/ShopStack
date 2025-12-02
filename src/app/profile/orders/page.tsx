
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getOrdersByUserId, getProductById } from '@/lib/api';
import type { Product } from '@/lib/types';

interface OrderItem {
    productId: string;
    name: string;
    qty: number;
    price: number;
    image: string;
}

interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string | Date;
    isDelivered: boolean;
    deliveredAt?: string | Date;
    createdAt: string | Date;
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from 'next/image';

function OrderItemDetails({ item }: { item: OrderItem }) {
    const [product, setProduct] = useState<Product | null | undefined>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const p = await getProductById(item.productId);
            setProduct(p);
        };
        fetchProduct();
    }, [item.productId]);

    return (
         <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted">
                        {product ? (
                            <Image 
                                src={product.imageURL} 
                                alt={product.name} 
                                fill
                                className="object-cover"
                                data-ai-hint={product.imageHint} 
                            />
                        ) : <Skeleton className="w-full h-full" />}
                    </div>
                    <span className="font-medium">{product?.name || 'Loading...'}</span>
                </div>
            </TableCell>
            <TableCell>{item.qty}</TableCell>
            <TableCell className="text-right">₹{(item.price * item.qty).toFixed(2)}</TableCell>
        </TableRow>
    )
}

export default function OrderHistoryPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isFetchingOrders, setIsFetchingOrders] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
        setIsFetchingOrders(true);
        const fetchOrders = async () => {
            const orders = await getOrdersByUserId(user.id);
            const sortedOrders = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setUserOrders(sortedOrders);
            setIsFetchingOrders(false);
        }
        fetchOrders();
    }
  }, [user]);

  if (isLoading || isFetchingOrders || !user) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
            <Button asChild variant="outline" size="sm">
                <Link href="/profile">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Profile
                </Link>
            </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Order History</CardTitle>
            <CardDescription>Here are all the purchases you've made with us.</CardDescription>
          </CardHeader>
          <CardContent>
            {userOrders.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed rounded-lg">
                <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
                <h2 className="mt-6 text-xl font-semibold">You haven’t purchased anything yet.</h2>
                <p className="mt-2 text-muted-foreground">
                  Looks like you have no past orders. Let's change that!
                </p>
                <Button asChild className="mt-6">
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            ) : (
                <Accordion type="single" collapsible className="w-full">
                    {userOrders.map((order) => (
                        <AccordionItem value={order.id} key={order.id}>
                            <AccordionTrigger>
                                <div className="flex justify-between w-full pr-4 text-sm">
                                    <div className="text-left">
                                        <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                                        <p className="text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">₹{order.totalPrice.toFixed(2)}</p>
                                        <Badge variant={order.isPaid ? 'default' : 'secondary'} className="mt-1">
                                            {order.isPaid ? 'Paid' : 'Pending'}
                                        </Badge>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="p-4 bg-secondary/50 rounded-md">
                                    <h4 className="font-semibold mb-3">Order Details</h4>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Product</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead className="text-right">Price</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {order.items && order.items.map((item, index) => (
                                               <OrderItemDetails key={`${order.id}-${index}`} item={item} />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
