
"use server";

import { db } from "@/lib/db";
import type { Product } from "@/lib/types";

type AddProductInput = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageURL?: string;
};

export async function addProductAction(input: AddProductInput): Promise<Product | null> {
  try {
    // This now uses our in-memory DB singleton
    const newProduct = db.addProduct(input);
    return newProduct;
  } catch (error) {
    console.error("Failed to add product:", error);
    return null;
  }
}
