
"use server";

import { addProduct } from "@/lib/data";
import type { Product } from "@/lib/types";

type AddProductInput = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
};

export async function addProductAction(input: AddProductInput): Promise<Product | null> {
  try {
    // In a real app, you would add this to a database.
    // For now, we'll add it to our mock data array.
    const newProduct = addProduct(input);
    return newProduct;
  } catch (error) {
    console.error("Failed to add product:", error);
    return null;
  }
}
