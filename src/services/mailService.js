const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendNotificationEmail(to, productName) {
  await transporter.sendMail({
    from: `"Back In Stock Bot" <${process.env.EMAIL_USER}>`,
    to,
    subject: `${productName} is now back in stock!`,
    text: `Hi, the product "${productName}" is now available. Order it before it runs out again!`
  });
}

module.exports = { sendNotificationEmail };
