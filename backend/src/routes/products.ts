import { Router, Request, Response } from 'express';
import Product from '../models/Product';

const router = Router();

// GET all products with optional filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, search, skip = 0, limit = 10 } = req.query;
    let query: any = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query)
      .skip(Number(skip))
      .limit(Number(limit))
      .lean();

    const total = await Product.countDocuments(query);

    res.json({ products, total });
  } catch (err) {
    console.error('Failed to fetch products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET single product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Failed to fetch product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST create product (admin only)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, category, countInStock } = req.body;
    
    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      countInStock: countInStock || 0,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Failed to create product:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT update product (admin only)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Failed to update product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE product (admin only)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Failed to delete product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
