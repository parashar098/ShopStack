
import type { Product, User, Order } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const productsData: Omit<Product, 'imageURL' | 'imageHint'>[] = [
  { id: '1', name: 'Aura Chair', description: 'A modern, minimalist chair with wooden legs and a comfortable, upholstered seat. Perfect for any contemporary living space.', price: 149.99, category: 'Furniture', stock: 25 },
  { id: '2', name: 'Echo Buds', description: 'Sleek, wireless headphones with superior noise-cancelling technology and high-fidelity sound. Up to 30 hours of battery life.', price: 199.99, category: 'Electronics', stock: 40 },
  { id: '3', name: 'Chrono Watch', description: 'A stylish smart watch with a circular AMOLED display, fitness tracking, and a premium leather strap.', price: 249.99, category: 'Electronics', stock: 30 },
  { id: '4', name: 'Nomad Backpack', description: 'A vintage-style leather backpack with multiple compartments, perfect for work, travel, and daily adventures.', price: 89.99, category: 'Accessories', stock: 50 },
  { id: '5', name: 'Terra Mugs', description: 'A set of four beautifully crafted ceramic coffee mugs in earthy, pastel colors. Dishwasher and microwave safe.', price: 49.99, category: 'Home Goods', stock: 60 },
  { id: '6', name: 'ErgoMax Chair', description: 'The ultimate ergonomic office chair with adjustable lumbar support, armrests, and headrest for maximum comfort.', price: 349.99, category: 'Furniture', stock: 15 },
  { id: '7', name: 'AquaBoom Speaker', description: 'A portable Bluetooth speaker featuring a rugged, waterproof design and powerful bass. Ideal for outdoor use.', price: 79.99, category: 'Electronics', stock: 75 },
  { id: '8', name: 'Vortex Mouse', description: 'A high-performance gaming mouse with an ultra-lightweight design, customizable RGB lighting, and a precision sensor.', price: 59.99, category: 'Electronics', stock: 100 },
  { id: '9', name: 'Zen Desk', description: 'A minimalist wooden desk with a spacious surface and clean lines, designed to enhance focus and creativity.', price: 299.99, category: 'Furniture', stock: 20 },
  { id: '10', name: 'Solaris Sunglasses', description: 'A stylish pair of unisex sunglasses with polarized lenses, offering 100% UV protection and timeless design.', price: 129.99, category: 'Accessories', stock: 45 },
  { id: '11', name: 'Visionary Camera', description: 'A professional-grade mirrorless digital camera with a 24MP sensor and 4K video recording capabilities.', price: 899.99, category: 'Electronics', stock: 10 },
  { id: '12', name: 'Connect Hub', description: 'A central smart home hub that seamlessly connects and controls your lights, thermostat, locks, and more.', price: 99.99, category: 'Electronics', stock: 35 },
];

export const mockProducts: Product[] = productsData.map((product, index) => {
    const placeholder = PlaceHolderImages.find(p => p.id === `product-${index + 1}`)!;
    return {
        ...product,
        id: `product-${index + 1}`,
        imageURL: placeholder.imageUrl,
        imageHint: placeholder.imageHint,
    }
});

export const mockUsers: User[] = [
  { id: 'user-1', name: 'Admin User', email: 'admin@shopstack.com', role: 'admin', createdAt: new Date() },
  { id: 'user-2', name: 'Customer User', email: 'customer@shopstack.com', role: 'customer', createdAt: new Date() },
];

export const mockOrders: Order[] = [];
