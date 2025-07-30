// controllers/reward.controller.js
const Reward = require('../models/reward');
const User = require('../models/User');

exports.getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json({ rewards });
  } catch (err) {
    console.error('Error fetching rewards:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.claimReward = async (req, res) => {
  try {
    const { userId, rewardId } = req.body;

    console.log('🟡 Incoming reward claim request:', req.body);

    // Check for missing fields
    if (!userId || !rewardId) {
      return res.status(400).json({ error: 'Missing userId or rewardId' });
    }

    const user = await User.findById(userId);
    const reward = await Reward.findById(rewardId);

    if (!user || !reward) {
      return res.status(404).json({ error: 'User or reward not found' });
    }

    const userCoins = Number(user.coins);
    const rewardCost = Number(reward.cost);

    if (isNaN(userCoins) || isNaN(rewardCost)) {
      return res.status(400).json({ error: 'Invalid coins or reward cost' });
    }

    if (userCoins < rewardCost) {
      return res.status(400).json({ error: 'Not enough coins to claim reward' });
    }

    user.coins = userCoins - rewardCost;

    // Optional: Add claimedRewards array to track claimed history
    user.claimedRewards = user.claimedRewards || [];
    user.claimedRewards.push({
      rewardId: reward._id,
      claimedAt: new Date(),
    });

    await user.save();

    return res.status(200).json({
      message: `You successfully claimed: ${reward.title}`,
      coinsRemaining: user.coins,
    });
  } catch (err) {
    console.error('❌ Error in claimReward:', err.message);
    return res.status(500).json({ error: 'Internal server error during reward claim' });
  }
};

