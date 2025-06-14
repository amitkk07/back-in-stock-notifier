const { User, Product, Subscription } = require('../models');

// Subscribe a user to a product
const subscribeToProduct = async (req, res) => {
  try {
    const { email, productId } = req.body;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Find or create user
    const [user] = await User.findOrCreate({ where: { email } });

    // ✅ Fix: Use correct FK column names
    const existing = await Subscription.findOne({
      where: { UserId: user.id, ProductId: productId }
    });

    if (existing) return res.status(409).json({ message: 'Already subscribed to this product' });

    // Create new subscription
    const subscription = await Subscription.create({
      UserId: user.id,
      ProductId: productId
    });

    res.status(201).json({ message: 'Subscribed successfully', subscription });

  } catch (err) {
    console.error('Error subscribing:', err);
    res.status(500).json({ message: 'Failed to subscribe' });
  }
};


// Get all subscriptions (basic, for admin/test view)
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({
      include: [{ model: User }, { model: Product }],
      order: [['createdAt', 'DESC']],
    });

    res.json({ count: subscriptions.length, data: subscriptions });
  } catch (err) {
    console.error('Error fetching subscriptions:', err);
    res.status(500).json({ message: 'Failed to fetch subscriptions' });
  }
};

module.exports = {
  subscribeToProduct,
  getAllSubscriptions,
};
