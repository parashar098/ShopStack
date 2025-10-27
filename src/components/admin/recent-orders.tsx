
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getAllOrders } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default async function RecentOrders() {
    const allOrders = await getAllOrders();
    const recentOrders = [...allOrders].sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle className="font-headline">Recent Orders</CardTitle>
                    <CardDescription>
                        You have {allOrders.length} orders in total.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/admin/orders">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                {recentOrders.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Status
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Date
                                </TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <div className="font-medium">{order.shippingAddress.name}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {order.shippingAddress.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant={order.paymentStatus === 'completed' ? 'default' : 'destructive'}>
                                            {order.paymentStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">₹{order.totalAmount.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-muted-foreground text-center">No recent orders to display.</p>
                )}
            </CardContent>
        </Card>
    );
}
