// src/models/Product.ts
import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  countInStock: number;
  rating?: number;
  numReviews?: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = model<IProduct>('Product', productSchema);

export default Product;