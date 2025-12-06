
"use client";

import React, { useEffect, useState } from "react";
import OrdersTable from "@/components/admin/orders-table";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
        async function load() {
            try {
                const res = await fetch(`${API_BASE}/api/orders`);
                const data = res.ok ? await res.json() : [];
                const normalized = (data || []).map((o: any) => ({
                    ...o,
                    createdAt: o?.createdAt ? new Date(o.createdAt) : new Date(),
                    totalAmount: o?.totalPrice ?? o?.totalAmount ?? 0,
                }));
                setOrders(normalized);
            } catch (err: any) {
                console.error('Error fetching orders:', err);
                setError(String(err?.message || err));
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div className="text-red-600">Error loading orders: {error}</div>;

    const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-headline font-bold">Orders</h1>
            </div>
            <OrdersTable data={sortedOrders} />
        </div>
    );
}
