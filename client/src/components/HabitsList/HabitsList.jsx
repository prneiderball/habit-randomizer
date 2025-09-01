import React from "react";

const HabitList = ({ habits }) => {
  return (
    <div>
      <h2>Your Habits</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            {habit.title} - {habit.frequency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
