const express = require("express");

const router = express.Router();
const {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
} = require("../controllers/habitController");

router.post('/', createHabit);

router.get('/:userId', getHabits);

router.put('/:habitId', updateHabit);

router.delete('/:habitId', deleteHabit);

module.exports = router;