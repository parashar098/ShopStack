"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Product.ts
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
}, { timestamps: true });
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
