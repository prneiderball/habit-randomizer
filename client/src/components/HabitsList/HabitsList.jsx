import React from "react";
import "./HabitList.css"; 

const HabitList = ({ habits, onDelete }) => {
  if (!habits || habits.length === 0) {
    return <p className="muted">No habits yet. Add one above!</p>;
  }

  return (
    <div className="card habit-list">
      <h2>Your Habits</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            <div>
              <strong>{habit.title}</strong>
              {habit.description && <p>{habit.description}</p>}
              <p>Frequency: {habit.frequency}</p>
            </div>
            {onDelete && (
              <button
                className="btn delete"
                onClick={() => onDelete(habit._id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
