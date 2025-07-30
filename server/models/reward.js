const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  title: String,
cost: {
  type: Number,
  required: true,
},

  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Reward', rewardSchema);
