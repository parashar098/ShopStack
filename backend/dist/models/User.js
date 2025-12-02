"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/User.ts
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });
// Hash password before saving
userSchema.pre('save', async function () {
    // Only hash password if it's new or modified
    if (!this.isModified('password')) {
        return;
    }
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
    }
    catch (error) {
        throw error;
    }
});
// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    const user = this;
    return await bcryptjs_1.default.compare(enteredPassword, user.password);
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
