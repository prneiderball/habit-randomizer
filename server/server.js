const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const habitRoutes = require('./routes/habitRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Allowed origins (add more if needed)
const allowedOrigins = [
  'https://habit-randomizer.netlify.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Handle preflight OPTIONS requests for all routes
app.options(/.*/, cors());

app.use(express.json());

// Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Database Engaged"))
  .catch(err => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

// API routes only
app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);

app.listen(PORT, () => {
  console.log(`All systems nominal on port ${PORT}`);
});
