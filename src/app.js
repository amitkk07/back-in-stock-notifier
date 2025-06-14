const express = require('express');
const productRoutes = require('./routes/productRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('✅ Back-in-Stock Notifier API is running');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
