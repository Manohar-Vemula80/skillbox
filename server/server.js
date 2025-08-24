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

// ✅ Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173",            // local dev (Vite)
  "https://skillbox-kqzm.vercel.app"  // deployed frontend (Vercel)
];

// ✅ Proper CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow requests with no origin (Postman, curl, etc.)
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
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

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
