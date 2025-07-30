const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'General'
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  rewardCoins: {
    type: Number,
    default: 50 // ✅ how many coins user gets after enrolling
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
