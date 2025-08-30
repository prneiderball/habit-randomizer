const mongoose = require('mongoose');
const { Schema } = mongoose;

const habitSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    frequency: { type: String, enum: ["daily", "weekly", "custom"], required: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Habit', habitSchema);
