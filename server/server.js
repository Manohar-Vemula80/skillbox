const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseroutes = require('./routes/Course.route');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.route');
const userRoutes = require('./routes/user.routes');
const kitRoutes = require('./routes/Kit.route');
const rewardRoutes = require('./routes/reward.route');
// const cors = require('cors');
// const orderRoutes = require('./routes/order.routes');

// app.use(cors({
//   origin: 'http://localhost:5173', // ✅ Frontend origin
//   credentials: true               // ✅ Allow credentials (cookies, sessions)
// }));
dotenv.config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Error:', err));

app.use('/api/auth',authRoutes);
app.use('/api/courses',courseroutes );
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/enroll', require('./routes/enroll.route'));
app.use('/api/kits', kitRoutes);
app.use('/api/rewards', rewardRoutes);
// app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
