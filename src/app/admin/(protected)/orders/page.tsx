
import { mockOrders } from "@/lib/data";
import OrdersTable from "@/components/admin/orders-table";

export default function AdminOrdersPage() {
    // Sort orders by most recent
    const sortedOrders = [...mockOrders].sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-headline font-bold">Orders</h1>
            </div>
            <OrdersTable data={sortedOrders} />
        </div>
    );
}
