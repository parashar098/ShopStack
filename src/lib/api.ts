

import { fetchProducts as fetchProductsAPI, fetchProductById as fetchProductByIdAPI, fetchUserOrders, fetchAllUsers as fetchAllUsersAPI, fetchAllOrders as fetchAllOrdersAPI } from './backend-api';
import type { Product } from './types';

// Get products with optional filters (calls backend)
export async function getProducts(filters?: {
    category?: string;
    searchTerm?: string;
    sort?: string;
    priceRange?: number[];
    page?: number;
    limit?: number;
}): Promise<{ products: Product[], totalPages: number }> {
    try {
        const limit = filters?.limit || 8;
        const apiResponse = await fetchProductsAPI({
            category: filters?.category,
            search: filters?.searchTerm,
            skip: 0,
            limit: 100, // Fetch all products to apply filtering correctly
        });

        // Transform API response to Product interface
        let products = apiResponse.products.map((p: any) => ({
            id: p._id,
            name: p.name,
            description: p.description,
            price: p.price,
            imageURL: p.image,
            category: p.category,
            stock: p.countInStock,
            imageHint: p.category?.toLowerCase(),
            rating: p.rating || 0,
            reviews: [],
            specifications: [],
        }));

        // Apply price range filtering on client side
        if (filters?.priceRange && filters.priceRange.length === 2) {
            const [minPrice, maxPrice] = filters.priceRange;
            products = products.filter(p => p.price >= minPrice && p.price <= maxPrice);
        }

        // Apply client-side sorting if needed
        if (filters?.sort) {
            switch (filters.sort) {
                case 'price-asc':
                    products.sort((a: Product, b: Product) => a.price - b.price);
                    break;
                case 'price-desc':
                    products.sort((a: Product, b: Product) => b.price - a.price);
                    break;
                case 'newest':
                default:
                    // Keep original order
                    break;
            }
        }

        // Calculate pagination after all filtering and sorting
        const totalPages = Math.ceil(products.length / limit);
        const page = filters?.page || 1;
        const startIndex = (page - 1) * limit;
        const paginatedProducts = products.slice(startIndex, startIndex + limit);

        return { products: paginatedProducts, totalPages };
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return { products: [], totalPages: 0 };
    }
}

export async function getProductById(id: string) {
    try {
        const product = await fetchProductByIdAPI(id);
        return {
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            imageURL: product.image,
            category: product.category,
            stock: product.countInStock,
            imageHint: product.category?.toLowerCase(),
            rating: product.rating || 0,
            reviews: [],
            specifications: [],
        };
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
    }
}

export async function getCategories() {
    try {
        const { products } = await getProducts();
        const categoryNames = [...new Set(products.map(p => p.category))];
        return categoryNames.map(name => ({
            name,
            imageURL: `https://picsum.photos/seed/${name}/600/400`,
            imageHint: name.toLowerCase(),
        }));
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
}

export async function getFeaturedProducts(limit = 8) {
    try {
        const { products } = await getProducts({ limit });
        // Filter out products with empty or invalid imageURL
        return products.filter(p => p.imageURL && p.imageURL.trim() !== '');
    } catch (error) {
        console.error('Failed to fetch featured products:', error);
        return [];
    }
}

export async function getAllUsers() {
    try {
        return await fetchAllUsersAPI();
    } catch (error) {
        console.error('Failed to fetch all users:', error);
        return [];
    }
}

export async function getAllOrders() {
    try {
        return await fetchAllOrdersAPI();
    } catch (error) {
        console.error('Failed to fetch all orders:', error);
        return [];
    }
}

export async function getOrderById(id: string) {
    // Use the backend API
    console.warn('getOrderById should use backend-api.fetchOrder()');
    return null;
}

export async function getOrdersByUserId(userId: string) {
    try {
        const orders = await fetchUserOrders(userId);
        return orders.map((order: any) => ({
            id: order._id,
            userId: order.user,
            items: order.orderItems.map((item: any) => {
                // `item.product` may be populated (object) or an id string.
                const productId = item.product && typeof item.product === 'object' ? (item.product._id || item.product.id) : item.product;
                return {
                    productId,
                    name: item.name || (item.product && item.product.name) || '',
                    qty: item.qty,
                    price: item.price,
                    image: item.image || (item.product && item.product.image) || ''
                };
            }),
            shippingAddress: order.shippingAddress,
            paymentMethod: order.paymentMethod,
            itemsPrice: order.itemsPrice,
            taxPrice: order.taxPrice,
            shippingPrice: order.shippingPrice,
            totalPrice: order.totalPrice,
            isPaid: order.isPaid,
            paidAt: order.paidAt,
            isDelivered: order.isDelivered,
            deliveredAt: order.deliveredAt,
            createdAt: new Date(order.createdAt)
        }));
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
}
