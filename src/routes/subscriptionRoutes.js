const express = require('express');
const router = express.Router();
const {
  subscribeToProduct,
  getAllSubscriptions
} = require('../controllers/subscriptionController');

router.post('/', subscribeToProduct);
router.get('/', getAllSubscriptions);

module.exports = router;
