const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateStock,
} = require('../controllers/productController');

// POST /api/products
router.post('/', createProduct);

// GET /api/products
router.get('/', getAllProducts);

// PUT /api/products/:id/stock
router.put('/:id/stock', updateStock);

module.exports = router;
