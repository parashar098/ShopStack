
import StatCard from "@/components/admin/dashboard/stat-card";
import RecentOrders from "@/components/admin/recent-orders";
import { mockOrders, mockProducts, mockUsers } from "@/lib/data";

export default function AdminDashboardPage() {
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalProducts = mockProducts.length;
    const totalUsers = mockUsers.length;
    const totalOrders = mockOrders.length;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-headline font-bold">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    title="Total Revenue" 
                    value={`₹${totalRevenue.toFixed(2)}`}
                    icon="DollarSign"
                    footerText="+20.1% from last month" 
                />
                <StatCard 
                    title="Total Orders" 
                    value={`+${totalOrders}`}
                    icon="ShoppingCart"
                    footerText="Total orders placed" 
                />
                <StatCard 
                    title="Total Products" 
                    value={`${totalProducts}`} 
                    icon="Package"
                    footerText="Total products in store" 
                />
                <StatCard 
                    title="Total Users" 
                    value={`${totalUsers}`}
                    icon="Users"
                    footerText="Total registered users" 
                />
            </div>
            <RecentOrders />
        </div>
    );
}
