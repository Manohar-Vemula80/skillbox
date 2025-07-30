const mongoose = require('mongoose');

const kitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  level: String,
}, { timestamps: true });

module.exports = mongoose.model('Kit', kitSchema);
