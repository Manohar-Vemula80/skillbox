const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');

const checkout = async (req, res) => {
  try {
    const { userId, name, email, items, totalAmount } = req.body;

    if (!userId || !name || !email || !items || !Array.isArray(items) || items.length === 0 || !totalAmount) {
      return res.status(400).json({ error: 'Missing required fields or empty cart' });
    }

    const objectIdItems = items
      .filter(id => mongoose.Types.ObjectId.isValid(id))
      .map(id => new mongoose.Types.ObjectId(id));

    const newOrder = new Order({
      userId,
      name,
      email,
      items: objectIdItems,
      totalAmount,
    });

    await newOrder.save();

    // ✅ Add coins to user
    const user = await User.findById(userId);
    const coinsEarned = Math.floor(totalAmount / 100);

    if (user) {
      console.log('💰 Coins before:', user.coins);
      user.coins = (user.coins || 0) + coinsEarned;
      await user.save();
      console.log('✅ Coins after:', user.coins);
    }

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
      coinsEarned,
    });
  } catch (error) {
    console.error('Checkout error:', error.message);
    res.status(500).json({ error: 'Something went wrong during checkout' });
  }
};
const getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const orders = await Order.find({ userId })
      .populate('items', 'title price image') // Populate item details
      .sort({ createdAt: -1 }); // Sort by most recent first

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching order history:', error.message);
    res.status(500).json({ error: 'Something went wrong while fetching order history' });
  }
};

module.exports = {
  checkout,
  getOrderHistory,
};
