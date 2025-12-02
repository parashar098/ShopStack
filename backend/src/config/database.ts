// src/config/database.ts
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shopstack';

// Handle connection events
mongoose.connection.on('connected', () => {
  const dbName = mongoose.connection.db?.databaseName || 'unknown database';
  console.log(`MongoDB connected to: ${dbName}`);
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Handle process termination
const gracefulShutdown = async (msg: string, callback: () => void) => {
  await mongoose.connection.close();
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

const connectDB = async (): Promise<boolean> => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      family: 4, // Use IPv4, skip trying IPv6
    });
    return true;
  } catch (error) {
    console.error(`MongoDB connection error: ${(error as Error).message}`);
    console.error('Continuing without MongoDB. Some features will be disabled.');
    return false;
  }
};

export default connectDB;