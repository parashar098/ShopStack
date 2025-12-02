"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/database.ts
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shopstack';
// Handle connection events
mongoose_1.default.connection.on('connected', () => {
    var _a;
    const dbName = ((_a = mongoose_1.default.connection.db) === null || _a === void 0 ? void 0 : _a.databaseName) || 'unknown database';
    console.log(`MongoDB connected to: ${dbName}`);
});
mongoose_1.default.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
// Handle process termination
const gracefulShutdown = async (msg, callback) => {
    await mongoose_1.default.connection.close();
    console.log(`MongoDB disconnected through ${msg}`);
    callback();
};
// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            family: 4, // Use IPv4, skip trying IPv6
        });
        return true;
    }
    catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        console.error('Continuing without MongoDB. Some features will be disabled.');
        return false;
    }
};
exports.default = connectDB;
