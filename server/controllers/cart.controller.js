const Cart = require('../models/Cart');
const Course = require('../models/Course');

exports.addToCart = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [courseId],
      });
    } else {
      if (!cart.items.includes(courseId)) {
        cart.items.push(courseId);
      }
    }

    await cart.save();
    res.status(201).json({ message: 'Course added to cart', cart });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate('items');

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ error: 'Cart not found or empty' });
    }

    res.status(200).json({ cart });
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
