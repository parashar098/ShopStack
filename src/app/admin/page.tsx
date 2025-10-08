
import { DollarSign, Package, Users } from "lucide-react";
import StatCard from "@/components/admin/dashboard/stat-card";
import RecentActivityCard from "@/components/admin/dashboard/recent-activity-card";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-headline font-bold">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatCard 
                    title="Total Revenue" 
                    value="$45,231.89" 
                    icon={DollarSign}
                    footerText="+20.1% from last month" 
                />
                <StatCard 
                    title="Total Products" 
                    value="12" 
                    icon={Package}
                    footerText="Total products in store" 
                />
                <StatCard 
                    title="Total Users" 
                    value="2" 
                    icon={Users}
                    footerText="Total registered users" 
                />
            </div>
            <RecentActivityCard />
        </div>
    );
}
