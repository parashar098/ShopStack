"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// Register user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Check if user already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        // Create new user
        const user = new User_1.default({ name, email, password, isAdmin: false });
        await user.save();
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    catch (err) {
        console.error('Registration failed:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});
// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }
        // Find user by email
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    catch (err) {
        console.error('Login failed:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});
// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        console.error('Failed to fetch user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// Update user profile
router.put('/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (name)
            user.name = name;
        if (email)
            user.email = email;
        if (password)
            user.password = password; // Pre-save hook will hash it
        await user.save();
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    catch (err) {
        console.error('Failed to update user:', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
});
exports.default = router;
