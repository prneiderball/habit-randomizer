const Habit = require("../models/Habit");

// create a new habit
exports.createHabit = async (req, res) => {
  try {
    const { title, description, fequency } = req.body;
    const habit = new Habit({ title, desctription, frequency, user: userId });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// get all habits for specific user
exports.getHabits = async (req, res) => {
  try {
    const { userId } = req.params;
    const habits = await Habit.find({ user: userId });
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// update habit
exports.updateHabits= async (req, res) => {
    try {
        const { habitId } = req.params;
        const updates = req.body;

        const habit = await Habit.findByIdAndUpdate(habitId, updates, { new: true });

        if (!habit) {
            return res.status(404).json({ error: "Habit not found" });
        }

        res.status(200).json(habit);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
