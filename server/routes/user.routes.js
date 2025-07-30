// routes/user.route.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const { getUserById } = require('../controllers/user.controller');

router.get('/:id', getUserById); // ✅ This should exist
// ✅ Correct route for user profile by ID
router.get('/:userId', userController.getUserProfile);

module.exports = router;
