
"use server";

import { db } from "@/lib/db";
import type { Order } from "@/lib/types";

type PlaceOrderInput = {
  userId: string;
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
  };
  items: { productId: string; quantity: number, price: number }[];
  totalAmount: number;
};

export async function placeOrder(input: PlaceOrderInput): Promise<string | null> {
  try {
    // Persist order to the Express backend so it is stored in MongoDB
    const API_BASE = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Build order payload expected by backend
    const itemsPrice = input.items.reduce((sum, it) => sum + (it.price * it.quantity), 0);
    const orderPayload = {
      user: input.userId,
      orderItems: input.items.map(it => ({ product: it.productId, name: '', qty: it.quantity, price: it.price, image: '' })),
      shippingAddress: input.shippingAddress,
      paymentMethod: 'mock',
      itemsPrice,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: input.totalAmount,
    };

    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Backend order creation failed:', res.status, text);
      throw new Error('Failed to create order on backend');
    }

    const created = await res.json();
    // Backend returns the saved order object; use its _id or id
    return created._id || created.id || null;
  } catch (error) {
    console.error("Failed to place order:", error);
    return null;
  }
}


export async function createRazorpayOrder(amount: number) {
  // This function is no longer the primary method for demo checkout,
  // but is kept for potential future real implementation.
  try {
    const mockOrder = {
      id: `order_demo_${Date.now()}`,
      entity: "order",
      amount: amount * 100,
      amount_paid: 0,
      amount_due: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      status: "created",
      attempts: 0,
      notes: [],
      created_at: Math.floor(Date.now() / 1000),
    };
    
    return { success: true, order: mockOrder };
  } catch (error) {
    console.error("Failed to create mock Razorpay order:", error);
    return { success: false, error: "Could not create mock Razorpay order." };
  }
}
