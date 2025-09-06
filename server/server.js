require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const habitRoutes = require('./routes/habitRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;

const allowedOrigins = ['https://habit-randomizer.netlify.app'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error('CORS policy does not allow access from this origin'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Database Engaged"))
  .catch(err => {
    console.error("Database connection failed:");
    console.error(err.message);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('Habit Randomizer engaged');
});

app.use('/api/habits', habitRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`All systems nominal http://localhost:${PORT}`);
});
