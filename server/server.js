require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Habit = require('./models/Habit');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
})
  .then(() => console.log("Database Engaged"))
  .catch(err => {
    console.error("Database connection failed:");
    console.error(err.message);
    process.exit(1); 
  });

  console.log("Registered Models:", mongoose.models);


// Routes
app.get('/', (req, res) => {
  res.send('Habit Randomizer enaged');
});

// Start server
app.listen(PORT, () => {
  console.log(`All systems are nominal http://localhost:${PORT}`);
});
