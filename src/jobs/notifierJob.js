const { Product, Subscription, User } = require('../models');
const { sendNotificationEmail } = require('../services/mailService');

async function runNotifierJob() {
  const products = await Product.findAll({
    where: { stock: { gt: 0 } },
    include: [{
      model: Subscription,
      where: { isNotified: false },
      include: [User]
    }]
  });
console.log('🔎 Checking product:', products, 'stock:', );
  for (const product of products) {
    for (const subscription of product.Subscriptions) {
      try {
        console.log('→ Sending mail to', subscription.User.email);
        await sendNotificationEmail(subscription.User.email, product.name);
          console.log('✔️ Mail sent to', subscription.User.email);
        subscription.isNotified = true;
        subscription.notifiedAt = new Date();
        await subscription.save();

        console.log(`📧 Notified ${subscription.User.email} for product "${product.name}"`);
      } catch (err) {
        console.error(`❌ Failed to notify ${subscription.User.email}:`, err.message);
      }
    }
  }
}

module.exports = runNotifierJob;
