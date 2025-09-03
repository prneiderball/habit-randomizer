const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
  try {
    const { title, description, frequency } = req.body;

    const habit = new Habit({
      title,
      description,
      frequency,
      user: req.user.id,
    });

    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};
a
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id }); 
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const { habitId } = req.params;
    const updates = req.body;

    const habit = await Habit.findOneAndUpdate(
      { _id: habitId, user: req.user.id }, 
      updates,
      { new: true }
    );

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const { habitId } = req.params;

    const habit = await Habit.findOneAndDelete({
      _id: habitId,
      user: req.user.id, 
    });

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};
