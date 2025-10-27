
import { db } from './db';
import type { Product } from './types';

// Using 'unstable_cache' can help optimize data fetching in Next.js
// For this mock setup, we'll just call the db directly.

export async function getProducts(filters?: {
    category?: string;
    searchTerm?: string;
    sort?: string;
    priceRange?: number[];
    page?: number;
    limit?: number;
}): Promise<{ products: Product[], totalPages: number }> {
    let products = db.getProducts();

    if (filters) {
        if (filters.category && filters.category !== 'all') {
            products = products.filter(p => p.category === filters.category);
        }
        if (filters.searchTerm) {
            products = products.filter(p => p.name.toLowerCase().includes(filters.searchTerm!.toLowerCase()));
        }
         if (filters.priceRange) {
            products = products.filter(p => p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]);
        }

        if (filters.sort) {
            switch (filters.sort) {
                case 'price-asc':
                    products.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    products.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                default:
                    products.sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));
                    break;
            }
        }
    }
    
    const page = filters?.page || 1;
    const limit = filters?.limit || products.length;
    const totalPages = Math.ceil(products.length / limit);
    const paginatedProducts = products.slice((page - 1) * limit, page * limit);


    return { products: paginatedProducts, totalPages };
}

export async function getProductById(id: string) {
    return db.getProductById(id);
}

export async function getCategories() {
    const products = db.getProducts();
    const categoryNames = [...new Set(products.map(p => p.category))];
    return categoryNames.map(name => ({
        name,
        // In a real app, you'd have dedicated images for categories
        imageURL: `https://picsum.photos/seed/${name}/600/400`,
        imageHint: name.toLowerCase(),
    }));
}

export async function getFeaturedProducts(limit = 8) {
    const allProducts = db.getProducts();
    return allProducts.slice(0, limit);
}

export async function getAllUsers() {
    return db.getUsers();
}

export async function getAllOrders() {
    return db.getOrders();
}

export async function getOrderById(id: string) {
    return db.getOrderById(id);
}

export async function getOrdersByUserId(userId: string) {
    return db.getOrdersByUserId(userId);
}
