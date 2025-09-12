const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const habitRoutes = require('./routes/habitRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = [
  'https://habit-randomizer.netlify.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error('CORS policy does not allow access from this origin'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Database Engaged"))
  .catch(err => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);

const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`All systems nominal on port ${PORT}`);
});
