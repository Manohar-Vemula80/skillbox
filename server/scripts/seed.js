const mongoose = require('mongoose');
const Course = require('../models/Course');

const Reward = require('../models/reward');
const Order = require('../models/order');    // Optional
const { info } = require('../data/info');    // Import the info array from your file

// 🧠 Map local images to placeholder URLs or static references (MongoDB can’t store JS files or React images)
function imageToURL(imgArr) {
  return imgArr.length > 0 ? `/images/${imgArr[0].split('/').pop()}` : '';
}

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/skillbox');

    // Clear existing data
    await Course.deleteMany({});
    await Reward.deleteMany({});
    console.log('🧹 Cleared old data');

    // Insert courses
    const courseDocs = await Course.insertMany(
      info.map((item) => ({
        title: item.title,
        description: item.description,
        price: item.price,
        image: imageToURL(item.image),
        category: item.category,
        level: item.level
      }))
    );

    console.log(`✅ Inserted ${courseDocs.length} courses`);

    // Insert rewards (take 10 random courses as rewards)
    const rewardDocs = await Reward.insertMany(
      info.slice(0, 10).map((item) => ({
        title: item.title,
        cost: Math.floor(item.price * 0.5) // Example: reward cost = 50% of course price
      }))
    );

    console.log(`🎁 Inserted ${rewardDocs.length} rewards`);

    mongoose.disconnect();
    console.log('🔌 Disconnected from DB');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  }
}

seedDatabase();
