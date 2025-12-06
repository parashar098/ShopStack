
"use client";

import React, { useEffect, useState } from "react";
import StatCard from "@/components/admin/dashboard/stat-card";
import RecentOrders from "@/components/admin/recent-orders";

export default function AdminDashboardPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
        async function load() {
            try {
                const [ordersRes, productsRes, usersRes] = await Promise.all([
                    fetch(`${API_BASE}/api/orders`).then(r => r.ok ? r.json() : []),
                    fetch(`${API_BASE}/api/products?limit=100`).then(r => r.ok ? r.json() : { products: [] }),
                    fetch(`${API_BASE}/api/users`).then(r => r.ok ? r.json() : []),
                ]);

                const normalizedOrders = (ordersRes || []).map((o: any) => ({
                    ...o,
                    createdAt: o?.createdAt ? new Date(o.createdAt) : new Date(),
                    totalAmount: o?.totalPrice ?? o?.totalAmount ?? 0,
                }));

                const normalizedUsers = (usersRes || []).map((u: any) => ({
                    ...u,
                    createdAt: u?.createdAt ? new Date(u.createdAt) : new Date(),
                }));

                setOrders(normalizedOrders);
                setProducts((productsRes && productsRes.products) || []);
                setUsers(normalizedUsers);
            } catch (err: any) {
                console.error('Error loading admin data:', err);
                setError(String(err?.message || err));
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;
    if (error) return <div className="text-red-600">Error loading dashboard: {error}</div>;

    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const totalProducts = products.length;
    const totalUsers = users.length;
    const totalOrders = orders.length;

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

