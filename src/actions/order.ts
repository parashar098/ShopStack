
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
    const newOrderData = {
      userId: input.userId,
      items: input.items,
      totalAmount: input.totalAmount,
      shippingAddress: input.shippingAddress,
      paymentStatus: "completed" as const,
    };
    
    // Use the in-memory DB to create an order
    const newOrder = db.createOrder(newOrderData);

    return newOrder.id;
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
