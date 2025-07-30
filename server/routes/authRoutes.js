const express = require('express');
const router = express.Router();
const {
  register,
  sendOtp,
  verifyOtp,
  getProfile // ✅ Add this
} = require('../controllers/authController');

const verifyToken = require('../middlewares/authMiddleware'); // ✅ Add this

router.post('/register', register);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/profile', verifyToken, getProfile); // ✅ Add this

module.exports = router;
