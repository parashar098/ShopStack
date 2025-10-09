
"use server";

import Razorpay from "razorpay";
import { mockOrders } from "@/lib/data";
import type { Order } from "@/lib/types";

type PlaceOrderInput = {
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
  // In a real application, you would:
  // 1. Verify user authentication
  // 2. Save the order to a real database
  
  try {
    const newOrderId = `order-${Date.now()}`;
    const newOrder: Order = {
      id: newOrderId,
      userId: "user-2", // Mock user
      items: input.items,
      totalAmount: input.totalAmount,
      shippingAddress: input.shippingAddress,
      paymentStatus: "completed",
      createdAt: new Date(),
    };
    
    // Simulate saving to database
    mockOrders.push(newOrder);

    return newOrderId;
  } catch (error) {
    console.error("Failed to place order:", error);
    return null;
  }
}


export async function createRazorpayOrder(amount: number) {
  try {
    const instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    return { success: true, order };
  } catch (error) {
    console.error("Failed to create Razorpay order:", error);
    return { success: false, error: "Could not create Razorpay order." };
  }
}
