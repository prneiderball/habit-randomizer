require('dotenc').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedToplogy: true,
})
.then (() => console.log('Database engaged'))
.catch(err => console.error('Database connection failed:', err));

app.get('/', (req, res) => {
    res.send('Habit Randomizer API is online');
});

app.listen(PORT, () => {
    console.log(`All systems nominal on port ${PORT}`);
});