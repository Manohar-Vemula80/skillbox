const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/reward.controller');

// ✅ GET all rewards
router.get('/', rewardController.getAllRewards);

// ✅ POST claim reward
router.post('/claim', rewardController.claimReward);

module.exports = router;
