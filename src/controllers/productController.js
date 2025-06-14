const { Product } = require('../models');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, stock } = req.body;
    const product = await Product.create({ name, stock });
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

// Get all products with optional pagination
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      total: products.count,
      page: parseInt(page),
      pages: Math.ceil(products.count / limit),
      data: products.rows,
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Update stock of a product
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.stock = stock;
    await product.save();

    res.json({ message: 'Stock updated', product });
  } catch (err) {
    console.error('Error updating stock:', err);
    res.status(500).json({ message: 'Failed to update stock' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateStock,
};
