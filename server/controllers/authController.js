const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcrypt');

// Register user
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashed });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    await sendEmail(email, 'Your OTP Code', `Your OTP is ${otp}`);

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP


exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // ✅ Return full user object for frontend
  res.status(200).json({
    message: 'OTP verified successfully',
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
    token
  });
};

// ... existing code above

// ✅ Add this at the end
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -otp -otpExpiry');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};
