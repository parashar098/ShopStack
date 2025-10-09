
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageURL: string;
  stock: number;
  imageHint: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageURL: string;
  quantity: number;
  imageHint: string;
};

export type WishlistItem = Product;

export type Order = {
  id: string;
  userId: string;
  items: { productId: string; quantity: number; price: number }[];
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
  };
  createdAt: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  createdAt: Date;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}
