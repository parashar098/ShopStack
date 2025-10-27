
import type { Product, User, Order } from './types';

// --- INITIAL MOCK DATA ---
const initialProducts: Omit<Product, 'imageURL' | 'imageHint' | 'rating' | 'reviews' | 'specifications'>[] = [
  // ... (data from your original lib/data.ts will be here)
];

// --- IN-MEMORY DATABASE CLASS ---

class InMemoryDatabase {
  private products: Product[] = [];
  private users: User[] = [];
  private orders: Order[] = [];
  private placeholderImages: { id: string; imageUrl: string; imageHint: string }[] = [];


  constructor() {
    this.initializeData();
  }

  private initializeData() {
     this.placeholderImages = [
        { "id": "product-1", "imageUrl": "https://images.unsplash.com/photo-1643881080033-e67069c5e4df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx3aGl0ZSUyMHQtc2hpcnR8ZW58MHx8fHwxNzYxNTU4Nzk4fDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "white t-shirt" },
        { "id": "product-2", "imageUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxkZW5pbSUyMGphY2tldHxlbnwwfHx8fDE3NjE0ODYzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "denim jacket" },
        { "id": "product-3", "imageUrl": "https://images.unsplash.com/photo-1665084937620-3de82a059a38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxmbG9yYWwlMjBkcmVzc3xlbnwwfHx8fDE3NjE1NzI0ODB8MA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "floral dress" },
        { "id": "product-4", "imageUrl": "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxydW5uaW5nJTIwc2hvZXN8ZW58MHx8fHwxNzYxNTEyMDcwfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "running shoes" },
        { "id": "product-5", "imageUrl": "https://images.unsplash.com/photo-1628483211662-9bcc692c46dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxsZWF0aGVyJTIwd2FsbGV0fGVufDB8fHx8MTc2MTQ5ODIxMHww&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "leather wallet" },
        { "id": "product-6", "imageUrl": "https://images.unsplash.com/photo-1722448113450-f6860b7fbfe5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MHx8fHwxNzYxNDk4MjI3fDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "wireless earbuds" },
        { "id": "product-7", "imageUrl": "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzbWFydCUyMHdhdGNofGVufDB8fHx8MTc2MTU0MjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "smart watch" },
        { "id": "product-8", "imageUrl": "https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxnYW1pbmclMjBtb3VzZXxlbnwwfHx8fDE3NjE1ODI4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "gaming mouse" },
        { "id": "product-9", "imageUrl": "https://images.unsplash.com/photo-1618586810102-aaa7049200c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmR8ZW58MHx8fHwxNzYxNTk4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "mechanical keyboard" },
        { "id": "product-10", "imageUrl": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzbWFydCUyMHR2fGVufDB8fHx8MTc2MTU3MTU4NXww&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "smart tv" },
        { "id": "product-11", "imageUrl": "https://images.unsplash.com/photo-1610478506025-8110cc8f1986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBtdWd8ZW58MHx8fHwxNzYxNTIzNzkwfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "coffee mug" },
        { "id": "product-12", "imageUrl": "https://images.unsplash.com/photo-1621447980929-6638614633c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkZXNrJTIwbGFtcHxlbnwwfHx8fDE3NjE1ODkxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "desk lamp" },
        { "id": "product-13", "imageUrl": "https://images.unsplash.com/photo-1672062518694-9d86f3b6f000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjYW52YXMlMjBhcnR8ZW58MHx8fHwxNzYxNTI2ODgwfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "canvas art" },
        { "id": "product-14", "imageUrl": "https://images.unsplash.com/photo-1596301824628-4bf8dce3b4d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxmb2xkZWQlMjBzaGVldHN8ZW58MHx8fHwxNzYxNTk4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "folded sheets" },
        { "id": "product-15", "imageUrl": "https://images.unsplash.com/photo-1755584176597-d5c31c8a226e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxtaXN0JTIwZGlmZnVzZXJ8ZW58MHx8fHwxNzYxNTk4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "mist diffuser" },
        { "id": "product-16", "imageUrl": "https://images.unsplash.com/photo-1531812297762-cfeaab66c5cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxuZXclMjBpcGhvbmV8ZW58MHx8fHwxNzYxNTAzOTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "new iphone" },
        { "id": "product-17", "imageUrl": "https://images.unsplash.com/photo-1598327106026-d9521da673d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxhbmRyb2lkJTIwcGhvbmV8ZW58MHx8fHwxNzYxNTk4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "android phone" },
        { "id": "product-18", "imageUrl": "https://images.unsplash.com/photo-1596207891316-23851be3cc20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxwb3dlciUyMGJhbmt8ZW58MHx8fHwxNzYxNTk4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "power bank" },
        { "id": "product-19", "imageUrl": "https://images.unsplash.com/photo-1752830132482-def8649b6432?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjaGFyZ2luZyUyMGNhYmxlfGVufDB8fHx8MTc2MTU5ODM5MXww&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "charging cable" },
        { "id": "product-20", "imageUrl": "https://images.unsplash.com/photo-1574762919998-00a062825f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjbGVhciUyMGNhc2V8ZW58MHx8fHwxNzYxNTk4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "clear case" },
        { "id": "product-21", "imageUrl": "https://images.unsplash.com/photo-1531646317777-0619c7c5d1d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YmVhdXR5JTIwcHJvZHVjdHxlbnwwfHx8fDE3NjE1OTgzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "beauty product" },
        { "id": "product-22", "imageUrl": "https://images.unsplash.com/photo-1654374504608-67c4cfe65fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxsaXAlMjBjYXJlfGVufDB8fHx8MTc2MTU5ODM5MXww&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "lip care" },
        { "id": "product-23", "imageUrl": "https://images.unsplash.com/photo-1620331317984-53581633aff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxibG93JTIwZHJ5ZXJ8ZW58MHx8fHwxNzYxNTk4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "blow dryer" },
        { "id": "product-24", "imageUrl": "https://images.unsplash.com/photo-1709101242274-61efccd05376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxnbGFzcyUyMHBlcmZ1bWV8ZW58MHx8fHwxNzYxNTk4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "glass perfume" },
        { "id": "product-25", "imageUrl": "https://images.unsplash.com/photo-1715220169023-c1d5c8d2be37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxlbGVjdHJpYyUyMHNoYXZlcnxlbnwwfHx8fDE3NjE1OTgzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "electric shaver" },
        { "id": "product-26", "imageUrl": "https://images.unsplash.com/photo-1476979735039-2fdea9e9e407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxoaWtpbmclMjBiYWNrcGFja3xlbnwwfHx8fDE3NjE1OTgzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "hiking backpack" },
        { "id": "product-27", "imageUrl": "https://images.unsplash.com/flagged/photo-1568911117718-3554ef91cb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxibGFjayUyMHN1bmdsYXNzZXN8ZW58MHx8fHwxNzYxNTk4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "black sunglasses" },
        { "id": "product-28", "imageUrl": "https://images.unsplash.com/photo-1664714628878-9d2aa898b9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx3YXRlciUyMGJvdHRsZXxlbnwwfHx8fDE3NjE1NDI0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "water bottle" },
        { "id": "product-29", "imageUrl": "https://images.unsplash.com/photo-1643343990654-fdf43a1c6c18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx0cmF2ZWwlMjBwaWxsb3d8ZW58MHx8fHwxNzYxNTE5MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "travel pillow" },
        { "id": "product-30", "imageUrl": "https://images.unsplash.com/photo-1683394305929-5e7c8d942127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxneW0lMjBiYWd8ZW58MHx8fHwxNzYxNTk4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", "imageHint": "gym bag" }
    ];

    const productsData: Omit<Product, 'imageURL' | 'imageHint' | 'rating' | 'reviews' | 'specifications'>[] = [
        { id: '1', name: 'Classic White T-Shirt', description: '100% cotton, slim fit', price: 499, category: 'Fashion', stock: 120 },
        { id: '2', name: 'Men’s Denim Jacket', description: 'Stylish and durable denim', price: 1999, category: 'Fashion', stock: 75 },
        { id: '3', name: 'Women’s Floral Dress', description: 'Light summer dress', price: 1499, category: 'Fashion', stock: 50 },
        { id: '4', name: 'Sports Sneakers', description: 'Lightweight running shoes', price: 2499, category: 'Footwear', stock: 80 },
        { id: '5', name: 'Leather Wallet', description: 'Genuine leather men’s wallet', price: 799, category: 'Accessories', stock: 150 },
        { id: '6', name: 'Wireless Earbuds', description: 'Bluetooth 5.3 with mic', price: 1999, category: 'Electronics', stock: 90 },
        { id: '7', name: 'Smartwatch X10', description: 'Fitness tracking + notifications', price: 2999, category: 'Electronics', stock: 60 },
        { id: '8', name: 'Gaming Mouse RGB', description: 'High DPI + LED lights', price: 899, category: 'Electronics', stock: 110 },
        { id: '9', name: 'Mechanical Keyboard', description: 'Blue switch + backlit', price: 2299, category: 'Electronics', stock: 45 },
        { id: '10', name: '32-inch Smart LED TV', description: 'Full HD with OTT apps', price: 12999, category: 'Electronics', stock: 25 },
        { id: '11', name: 'Ceramic Coffee Mug', description: 'Microwave-safe, 350ml', price: 299, category: 'Home', stock: 200 },
        { id: '12', name: 'LED Desk Lamp', description: 'Adjustable with USB charging', price: 899, category: 'Home', stock: 75 },
        { id: '13', name: 'Wall Art Canvas', description: 'Abstract modern painting', price: 1499, category: 'Home', stock: 40 },
        { id: '14', name: 'Cotton Bed Sheet Set', description: 'Double bed, soft fabric', price: 1199, category: 'Home', stock: 60 },
        { id: '15', name: 'Aroma Diffuser', description: 'Wooden finish with LED light', price: 1099, category: 'Home', stock: 30 },
        { id: '16', name: 'iPhone 14 Pro', description: '128GB, Deep Purple', price: 119999, category: 'Mobiles', stock: 15 },
        { id: '17', name: 'Samsung Galaxy S23', description: '256GB, Phantom Black', price: 94999, category: 'Mobiles', stock: 20 },
        { id: '18', name: 'Power Bank 10000mAh', description: 'Fast charging', price: 1299, category: 'Accessories', stock: 80 },
        { id: '19', name: 'Type-C Cable', description: '1m braided charging cable', price: 299, category: 'Accessories', stock: 200 },
        { id: '20', name: 'Mobile Back Cover', description: 'Transparent soft TPU', price: 249, category: 'Accessories', stock: 300 },
        { id: '21', name: 'Herbal Face Wash', description: 'Aloe vera & Neem', price: 299, category: 'Beauty', stock: 120 },
        { id: '22', name: 'Lip Balm Pack', description: '3-in-1 fruity set', price: 399, category: 'Beauty', stock: 90 },
        { id: '23', name: 'Hair Dryer', description: '1200W compact design', price: 1499, category: 'Beauty', stock: 60 },
        { id: '24', name: 'Perfume “Elegance”', description: 'Long-lasting fragrance', price: 1299, category: 'Beauty', stock: 45 },
        { id: '25', name: 'Beard Trimmer', description: 'Rechargeable, cordless', price: 1699, category: 'Beauty', stock: 70 },
        { id: '26', name: 'Travel Backpack', description: 'Waterproof 35L bag', price: 1899, category: 'Travel', stock: 65 },
        { id: '27', name: 'Sunglasses', description: 'UV-protected, unisex', price: 699, category: 'Lifestyle', stock: 120 },
        { id: '28', name: 'Smart Water Bottle', description: 'Temperature display lid', price: 1299, category: 'Lifestyle', stock: 30 },
        { id: '29', name: 'Foldable Travel Pillow', description: 'Memory foam comfort', price: 999, category: 'Travel', stock: 50 },
        { id: '30', name: 'Duffel Bag', description: 'Gym & travel use', price: 1499, category: 'Lifestyle', stock: 70 },
    ];

    this.products = productsData.map((product, index) => {
        const placeholder = this.placeholderImages.find(p => p.id === `product-${index + 1}`);
        if (!placeholder) {
          throw new Error(`Placeholder image not found for product id: product-${index + 1}`);
        }

        const rating = (Math.random() * (5 - 3.5) + 3.5);
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
        };
    });

    this.users = [
      { id: 'user-1', name: 'Admin User', email: 'admin@shopstack.com', role: 'admin', createdAt: new Date(), phone: '1234567890', gender: 'male', dob: '1990-01-01', profileImage: 'https://i.pravatar.cc/150?u=admin' },
      { id: 'user-2', name: 'Customer User', email: 'customer@shopstack.com', role: 'customer', createdAt: new Date(), phone: '0987654321', gender: 'female', dob: '1995-05-20', profileImage: 'https://i.pravatar.cc/150?u=customer' },
    ];
    
    this.orders = [];
  }

  // Product Methods
  getProducts() {
    return this.products;
  }

  getProductById(id: string) {
    return this.products.find(p => p.id === id);
  }

  addProduct(productData: Omit<Product, 'id' | 'imageHint' | 'rating' | 'reviews' | 'specifications'>) {
    const newId = `product-${this.products.length + 1}`;
    const newProduct: Product = {
        ...productData,
        id: newId,
        imageURL: productData.imageURL || `https://picsum.photos/seed/${131 + this.products.length}/600/600`,
        imageHint: productData.name.split(' ').slice(0,2).join(' ').toLowerCase(),
        rating: 0,
        reviews: [],
        specifications: [
            { name: 'Material', value: 'N/A' },
            { name: 'Weight', value: 'N/A' },
        ]
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  // User Methods
  getUsers() {
    return this.users;
  }

  findUserByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }

  addUser(userData: { name: string; email: string }) {
    const newUser: User = {
      id: `user-${this.users.length + 1}`,
      name: userData.name,
      email: userData.email,
      role: 'customer',
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(userId: string, updatedData: Partial<User>) {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return null;
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updatedData };
    return this.users[userIndex];
  }

  // Order Methods
  getOrders() {
    return this.orders;
  }

  getOrdersByUserId(userId: string) {
    return this.orders.filter(o => o.userId === userId);
  }
  
  getOrderById(orderId: string) {
      return this.orders.find(o => o.id === orderId);
  }

  createOrder(orderData: Omit<Order, 'id' | 'createdAt'>) {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      createdAt: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }
}

// Singleton instance of the database
export const db = new InMemoryDatabase();
