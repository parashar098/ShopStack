// Backend API client for ShopStack
// Calls the Express backend running on http://localhost:5000

import type { User } from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function to transform MongoDB user response to User type
function transformUser(data: any): User {
  return {
    id: data._id || data.id,
    name: data.name,
    email: data.email,
    role: data.isAdmin ? 'admin' : 'customer',
    createdAt: new Date(data.createdAt || new Date()),
    phone: data.phone,
    gender: data.gender,
    dob: data.dob,
    profileImage: data.profileImage,
  };
}

// Products API
export async function fetchProducts(filters?: {
  category?: string;
  search?: string;
  skip?: number;
  limit?: number;
}) {
  try {
    const query = new URLSearchParams();
    if (filters?.category) query.append('category', filters.category);
    if (filters?.search) query.append('search', filters.search);
    if (filters?.skip) query.append('skip', filters.skip.toString());
    if (filters?.limit) query.append('limit', filters.limit.toString());

    try {
      const res = await fetch(`${API_BASE}/api/products?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    } catch (err) {
      console.error('Error fetching products from backend:', err);
      // Return a safe fallback so SSR doesn't crash when backend is temporarily down
      return { products: [], total: 0 };
    }
  } catch (err) {
    console.error('Error fetching products:', err);
    throw err;
  }
}

export async function fetchProductById(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return await res.json();
  } catch (err) {
    console.error('Error fetching product by id from backend:', err);
    return null;
  }
}

export async function createProduct(productData: {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  countInStock: number;
}) {
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return await res.json();
  } catch (err) {
    console.error('Error creating product:', err);
    throw err;
  }
}

// Users API
export async function registerUser(name: string, email: string, password: string): Promise<User> {
  try {
    const res = await fetch(`${API_BASE}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Registration failed');
    }
    const data = await res.json();
    return transformUser(data);
  } catch (err) {
    console.error('Error registering user:', err);
    throw err;
  }
}

export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const res = await fetch(`${API_BASE}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }
    const data = await res.json();
    return transformUser(data);
  } catch (err) {
    console.error('Error logging in:', err);
    throw err;
  }
}

export async function fetchUser(userId: string) {
  try {
    const res = await fetch(`${API_BASE}/api/users/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return await res.json();
  } catch (err) {
    console.error('Error fetching user:', err);
    throw err;
  }
}

export async function updateUser(userId: string, userData: any) {
  try {
    const res = await fetch(`${API_BASE}/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return await res.json();
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
}

// Orders API
export async function createOrder(orderData: {
  user: string;
  orderItems: Array<{
    product: string;
    name: string;
    qty: number;
    image: string;
    price: number;
  }>;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}) {
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error('Failed to create order');
    return await res.json();
  } catch (err) {
    console.error('Error creating order:', err);
    throw err;
  }
}

export async function fetchOrder(orderId: string) {
  try {
    const res = await fetch(`${API_BASE}/api/orders/${orderId}`);
    if (!res.ok) throw new Error('Failed to fetch order');
    return await res.json();
  } catch (err) {
    console.error('Error fetching order:', err);
    throw err;
  }
}

export async function fetchUserOrders(userId: string) {
  try {
    const res = await fetch(`${API_BASE}/api/orders/user/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return await res.json();
  } catch (err) {
    console.error('Error fetching orders:', err);
    throw err;
  }
}

export async function markOrderAsPaid(orderId: string, paymentResult: any) {
  try {
    const res = await fetch(`${API_BASE}/api/orders/${orderId}/pay`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentResult }),
    });
    if (!res.ok) throw new Error('Failed to mark order as paid');
    return await res.json();
  } catch (err) {
    console.error('Error marking order as paid:', err);
    throw err;
  }
}

export async function markOrderAsDelivered(orderId: string) {
  try {
    const res = await fetch(`${API_BASE}/api/orders/${orderId}/deliver`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to mark order as delivered');
    return await res.json();
  } catch (err) {
    console.error('Error marking order as delivered:', err);
    throw err;
  }
}
