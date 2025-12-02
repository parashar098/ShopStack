"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const products_1 = __importDefault(require("./routes/products"));
const users_1 = __importDefault(require("./routes/users"));
const orders_1 = __importDefault(require("./routes/orders"));
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to ShopStack API' });
});
// API routes
app.use('/api/products', products_1.default);
app.use('/api/users', users_1.default);
app.use('/api/orders', orders_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
exports.default = app;
