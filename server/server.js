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

dotenv.config();

const app = express();

// ✅ Allowed origins (add all your frontend URLs here)
const allowedOrigins = [
  "http://localhost:5173",
  "https://skillbox-beta.vercel.app",
  "https://skillbox-six.vercel.app",
  "https://skillbox-manohar-vemulas-projects.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  // .then(() => console.log('✅ MongoDB Connected'))
  // .catch((err) => console.log('❌ MongoDB Error:', err));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseroutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/enroll', require('./routes/enroll.route'));
app.use('/api/kits', kitRoutes);
app.use('/api/rewards', rewardRoutes);

// ✅ Health check route (for testing)
app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
