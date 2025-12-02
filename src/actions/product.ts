
"use server";

import { createProduct as createProductAPI } from "@/lib/backend-api";
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
    // Call the backend API to create product
    const result = await createProductAPI({
      name: input.name,
      description: input.description,
      price: input.price,
      image: input.imageURL || '/images/placeholder.jpg',
      category: input.category,
      countInStock: input.stock,
    });

    // Transform response to match Product interface
    return {
      id: result._id,
      name: result.name,
      description: result.description,
      price: result.price,
      imageUrl: result.image,
      category: result.category,
      stock: result.countInStock,
      imageHint: input.category.toLowerCase(),
    } as Product;
  } catch (error) {
    console.error("Failed to add product:", error);
    return null;
  }
}
