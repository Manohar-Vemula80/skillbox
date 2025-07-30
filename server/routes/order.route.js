const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

// ✅ Make sure these functions exist and are exported
router.post('/checkout', orderController.checkout);
router.get('/history/:userId', orderController.getOrderHistory);

module.exports = router;
