import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import productRoutes from './routes/products';
import userRoutes from './routes/users';
import orderRoutes from './routes/orders';

const app: Application = express();

// Middleware
app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); 

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to ShopStack API' });
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
