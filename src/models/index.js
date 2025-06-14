const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');
const Subscription = require('./subscription');

// Relationships
User.hasMany(Subscription, { onDelete: 'CASCADE' });
Subscription.belongsTo(User);

Product.hasMany(Subscription, { onDelete: 'CASCADE' });
Subscription.belongsTo(Product);

module.exports = {
  sequelize,
  User,
  Product,
  Subscription
};
