
import type { Product, User, Order } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const productsData: Omit<Product, 'imageURL' | 'imageHint' | 'rating' | 'reviews' | 'specifications'>[] = [
  // Fashion & Apparel
  { id: '1', name: 'Classic White T-Shirt', description: '100% cotton, slim fit', price: 499, category: 'Fashion', stock: 120 },
  { id: '2', name: 'Men’s Denim Jacket', description: 'Stylish and durable denim', price: 1999, category: 'Fashion', stock: 75 },
  { id: '3', name: 'Women’s Floral Dress', description: 'Light summer dress', price: 1499, category: 'Fashion', stock: 50 },
  { id: '4', name: 'Sports Sneakers', description: 'Lightweight running shoes', price: 2499, category: 'Footwear', stock: 80 },
  { id: '5', name: 'Leather Wallet', description: 'Genuine leather men’s wallet', price: 799, category: 'Accessories', stock: 150 },
  // Electronics
  { id: '6', name: 'Wireless Earbuds', description: 'Bluetooth 5.3 with mic', price: 1999, category: 'Electronics', stock: 90 },
  { id: '7', name: 'Smartwatch X10', description: 'Fitness tracking + notifications', price: 2999, category: 'Electronics', stock: 60 },
  { id: '8', name: 'Gaming Mouse RGB', description: 'High DPI + LED lights', price: 899, category: 'Electronics', stock: 110 },
  { id: '9', name: 'Mechanical Keyboard', description: 'Blue switch + backlit', price: 2299, category: 'Electronics', stock: 45 },
  { id: '10', name: '32-inch Smart LED TV', description: 'Full HD with OTT apps', price: 12999, category: 'Electronics', stock: 25 },
  // Home & Living
  { id: '11', name: 'Ceramic Coffee Mug', description: 'Microwave-safe, 350ml', price: 299, category: 'Home', stock: 200 },
  { id: '12', name: 'LED Desk Lamp', description: 'Adjustable with USB charging', price: 899, category: 'Home', stock: 75 },
  { id: '13', name: 'Wall Art Canvas', description: 'Abstract modern painting', price: 1499, category: 'Home', stock: 40 },
  { id: '14', name: 'Cotton Bed Sheet Set', description: 'Double bed, soft fabric', price: 1199, category: 'Home', stock: 60 },
  { id: '15', name: 'Aroma Diffuser', description: 'Wooden finish with LED light', price: 1099, category: 'Home', stock: 30 },
  // Mobiles & Accessories
  { id: '16', name: 'iPhone 14 Pro', description: '128GB, Deep Purple', price: 119999, category: 'Mobiles', stock: 15 },
  { id: '17', name: 'Samsung Galaxy S23', description: '256GB, Phantom Black', price: 94999, category: 'Mobiles', stock: 20 },
  { id: '18', name: 'Power Bank 10000mAh', description: 'Fast charging', price: 1299, category: 'Accessories', stock: 80 },
  { id: '19', name: 'Type-C Cable', description: '1m braided charging cable', price: 299, category: 'Accessories', stock: 200 },
  { id: '20', name: 'Mobile Back Cover', description: 'Transparent soft TPU', price: 249, category: 'Accessories', stock: 300 },
  // Beauty & Personal Care
  { id: '21', name: 'Herbal Face Wash', description: 'Aloe vera & Neem', price: 299, category: 'Beauty', stock: 120 },
  { id: '22', name: 'Lip Balm Pack', description: '3-in-1 fruity set', price: 399, category: 'Beauty', stock: 90 },
  { id: '23', name: 'Hair Dryer', description: '1200W compact design', price: 1499, category: 'Beauty', stock: 60 },
  { id: '24', name: 'Perfume “Elegance”', description: 'Long-lasting fragrance', price: 1299, category: 'Beauty', stock: 45 },
  { id: '25', name: 'Beard Trimmer', description: 'Rechargeable, cordless', price: 1699, category: 'Beauty', stock: 70 },
  // Travel & Lifestyle
  { id: '26', name: 'Travel Backpack', description: 'Waterproof 35L bag', price: 1899, category: 'Travel', stock: 65 },
  { id: '27', name: 'Sunglasses', description: 'UV-protected, unisex', price: 699, category: 'Lifestyle', stock: 120 },
  { id: '28', name: 'Smart Water Bottle', description: 'Temperature display lid', price: 1299, category: 'Lifestyle', stock: 30 },
  { id: '29', name: 'Foldable Travel Pillow', description: 'Memory foam comfort', price: 999, category: 'Travel', stock: 50 },
  { id: '30', name: 'Duffel Bag', description: 'Gym & travel use', price: 1499, category: 'Lifestyle', stock: 70 },
];

export const mockProducts: Product[] = productsData.map((product, index) => {
    const placeholder = PlaceHolderImages.find(p => p.id === `product-${index + 1}`);
    if (!placeholder) {
      throw new Error(`Placeholder image not found for product id: product-${index + 1}`);
    }

    // Mocked data for new fields
    const rating = (Math.random() * (5 - 3.5) + 3.5); // Random rating between 3.5 and 5
    const reviews = [
        { id: 'review-1', author: 'Alex', rating: 5, title: 'Excellent!', text: 'High quality and worth every penny.', date: '2024-05-15' },
        { id: 'review-2', author: 'Maria', rating: 4, title: 'Very Good', text: 'Almost perfect, I love the design.', date: '2024-05-12' },
    ];
     const specifications = [
        { name: 'Material', value: product.category === 'Fashion' ? 'Cotton' : 'Varies' },
        { name: 'Weight', value: `${(Math.random() * 2 + 0.5).toFixed(1)} kg` },
    ];

    return {
        ...product,
        id: `product-${index + 1}`,
        imageURL: placeholder.imageUrl,
        imageHint: placeholder.imageHint,
        rating: parseFloat(rating.toFixed(1)),
        reviews,
        specifications
    }
});

export function addProduct(productData: Omit<Product, 'id' | 'imageURL' | 'imageHint' | 'rating' | 'reviews' | 'specifications'>): Product {
    const newId = `product-${mockProducts.length + 1}`;
    const newProduct: Product = {
        ...productData,
        id: newId,
        imageURL: `https://picsum.photos/seed/${131 + mockProducts.length}/600/600`,
        imageHint: productData.name.split(' ').slice(0,2).join(' ').toLowerCase(),
        rating: 0,
        reviews: [],
        specifications: [
            { name: 'Material', value: 'N/A' },
            { name: 'Weight', value: 'N/A' },
        ]
    };
    mockProducts.unshift(newProduct);
    return newProduct;
}


export const mockUsers: User[] = [
  { id: 'user-1', name: 'Admin User', email: 'admin@shopstack.com', role: 'admin', createdAt: new Date() },
  { id: 'user-2', name: 'Customer User', email: 'customer@shopstack.com', role: 'customer', createdAt: new Date() },
];

export const mockOrders: Order[] = [];
