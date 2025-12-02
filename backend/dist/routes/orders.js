"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const Order_1 = __importDefault(require("../models/Order"));
const router = (0, express_1.Router)();
// Create order
router.post('/', async (req, res) => {
    try {
        const { user, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
        if (!user || !orderItems || orderItems.length === 0) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const order = new Order_1.default({
            user,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    }
    catch (err) {
        console.error('Failed to create order:', err);
        res.status(500).json({ error: 'Failed to create order' });
    }
});
// Get order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order_1.default.findById(req.params.id)
            .populate('user', 'name email')
            .populate('orderItems.product');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    }
    catch (err) {
        console.error('Failed to fetch order:', err);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});
// Get orders by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        // If the provided userId is not a valid Mongo ObjectId, return an empty array
        // instead of letting Mongoose attempt to cast and throw a CastError.
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            return res.json([]);
        }
        // Cast the query to `any` to satisfy TypeScript generics while allowing
        // Mongoose to handle casting of the `user` field at runtime.
        const orders = await Order_1.default.find({ user: userId })
            .populate('user', 'name email')
            .populate('orderItems.product');
        res.json(orders);
    }
    catch (err) {
        console.error('Failed to fetch orders:', err);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});
// Update order payment status
router.patch('/:id/pay', async (req, res) => {
    try {
        const { paymentResult } = req.body;
        const order = await Order_1.default.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = paymentResult;
        const updated = await order.save();
        res.json(updated);
    }
    catch (err) {
        console.error('Failed to update order:', err);
        res.status(500).json({ error: 'Failed to update order' });
    }
});
// Update order delivery status
router.patch('/:id/deliver', async (req, res) => {
    try {
        const order = await Order_1.default.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        order.isDelivered = true;
        order.deliveredAt = new Date();
        const updated = await order.save();
        res.json(updated);
    }
    catch (err) {
        console.error('Failed to update order:', err);
        res.status(500).json({ error: 'Failed to update order' });
    }
});
exports.default = router;
// nodemon reload
