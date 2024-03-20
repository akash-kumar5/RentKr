// routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get products matching a keyword
router.get('/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const product = await Product.find(category);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product
router.post('/additem', async (req, res) => {
  try {
    // Extract product data from request body
    const { name, description, price, category, imageUrl } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl
    });

    // Save the product to the database
    await newProduct.save();

    // Return the newly created product
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
