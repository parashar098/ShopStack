
import { db } from './db';
import type { Product, User } from '@/lib/types';
export { mockCategories } from './categories';


// DEPRECATED - These functions now use the in-memory DB via API calls.
// They are kept for compatibility with any components that might still use them,
// but should be phased out.

export const mockProducts = db.getProducts();
export let mockUsers: User[] = db.getUsers();
export const mockOrders = db.getOrders();

export function addProduct(productData: Omit<Product, 'id' | 'imageHint' | 'rating' | 'reviews' | 'specifications'>): Product {
    return db.addProduct(productData);
}

export function addUser(userData: { name: string; email: string }): User {
  return db.addUser(userData);
}

export function updateUser(userId: string, updatedData: Partial<User>): User | null {
    return db.updateUser(userId, updatedData);
}
