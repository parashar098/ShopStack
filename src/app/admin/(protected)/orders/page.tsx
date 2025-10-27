
import { getAllOrders } from "@/lib/api";
import OrdersTable from "@/components/admin/orders-table";

export default async function AdminOrdersPage() {
    const orders = await getAllOrders();
    // Sort orders by most recent
    const sortedOrders = [...orders].sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-headline font-bold">Orders</h1>
            </div>
            <OrdersTable data={sortedOrders} />
        </div>
    );
}
