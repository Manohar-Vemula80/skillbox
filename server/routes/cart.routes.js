const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');

// ✅ Example routes
router.post('/add', cartController.addToCart);
router.get('/:userId', cartController.getUserCart); // ✅ THIS MUST BE A FUNCTION



module.exports = router;
