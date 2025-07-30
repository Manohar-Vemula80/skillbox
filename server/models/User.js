// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: String,
  otpExpiry: Date,
 
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
 coins: {
  type: Number,
  default: 0,
},
claimedRewards: [
  {
    rewardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward' },
    claimedAt: Date,
  },
],

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
