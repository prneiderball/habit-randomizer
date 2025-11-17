const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const habitRoutes = require('./routes/habitRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Allow your deployed site + local dev
const allowedOrigins = [
  'https://habit-randomizer.netlify.app',
  'https://habit-randomizer.onrender.com',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // mobile apps, curl, SSR, etc.

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// 🔥 Handle all preflight OPTIONS requests globally
app.options(/.*/, cors());

app.use(express.json());

// Connect to Mongo
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Database Engaged"))
  .catch(err => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

// API routes
app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);

// Serve frontend
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`All systems nominal on port ${PORT}`);
});
