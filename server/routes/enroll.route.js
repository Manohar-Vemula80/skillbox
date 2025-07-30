// routes/reward.route.js
const express = require('express');
const router = express.Router();
const { getAllRewards, claimReward } = require('../controllers/reward.controller');

router.get('/', getAllRewards);
router.post('/claim', claimReward);

module.exports = router;
