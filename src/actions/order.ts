
"use server";

import Razorpay from "razorpay";
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
