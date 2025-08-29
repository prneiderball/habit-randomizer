require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
})
  .then(() => console.log("✅ Database connected to MongoDB Atlas"))
  .catch(err => {
    console.error("❌ Database connection failed:");
    console.error(err.message);
    process.exit(1); 
  });

// Routes
app.get('/', (req, res) => {
  res.send('Habit Randomizer API is online 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`🌍 Server running at http://localhost:${PORT}`);
});
