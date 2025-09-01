const express = require("express");

const router = express.Router();
const {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
} = require("../controllers/habitController");
const auth = require("../middleware/auth");

router.post('/', auth, createHabit);

router.get('/:userId', auth, getHabits);

router.put('/:habitId', auth, updateHabit);

router.delete('/:habitId', auth, deleteHabit);

module.exports = router;