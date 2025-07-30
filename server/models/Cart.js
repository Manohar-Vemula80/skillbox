const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // ✅ reference Course
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
