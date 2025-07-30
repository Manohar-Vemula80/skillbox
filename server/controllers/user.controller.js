// controllers/user.controller.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(200).json({
    message: 'OTP verified successfully',
    token,
    userId: user._id,
  });
};

// ✅ GET /api/user/:userId — Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId; // 🔁 fixed from req.params.id

    const user = await User.findById(userId).select('-otp -otpExpiry'); // sanitize response
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ user });
  } catch (err) {
    console.error('Error getting user:', err.message);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      coins: user.coins, // ✅ make sure this is included
      createdAt: user.createdAt,
    });
  } catch (err) {
    console.error('Failed to fetch user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = {};

    if (req.body.fullName) updates.fullName = req.body.fullName;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.password) updates.password = req.body.password;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password -otp -otpExpiry');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error('❌ Error updating profile:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};
