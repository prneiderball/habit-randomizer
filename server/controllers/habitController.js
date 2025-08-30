const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
  try {
    const { title, description, frequency, userId } = req.body;

    const habit = new Habit({ title, description, frequency, user: userId });

    await habit.save();

    res.status(201).json(habit);
  } catch (err) {
    console.error("Error creating habit:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const { userId } = req.params;

    const habits = await Habit.find({ user: userId });

    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const { habitId } = req.params;

    const updates = req.body;

    const habit = await Habit.findByIdAndUpdate(habitId, updates, {
      new: true,
    });

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// delete a habit
exports.deleteHabit = async (req, res) => {
  try {
    const { habitId } = req.params;
    const habit = await Habit.findByIdAndDelete(habitId);
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};
