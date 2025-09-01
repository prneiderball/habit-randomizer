// components/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";

function Dashboard({ token, onLogout }) {
  const [habits, setHabits] = useState([]);
  const [randomHabit, setRandomHabit] = useState(null);

  // Fetch habits from backend
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/habits", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setHabits(data);
        if (data.length > 0) {
          setRandomHabit(data[Math.floor(Math.random() * data.length)]);
        }
      } catch (err) {
        console.error("Error fetching habits:", err);
      }
    };

    fetchHabits();
  }, [token]);

  return (
    <div className="dashboard">
      <header>
        <h1>Habit Randomizer</h1>
        <button onClick={onLogout}>Logout</button>
      </header>

      {randomHabit && (
        <section className="random-habit">
          <h2>Today's Random Habit</h2>
          <p><strong>{randomHabit.title}</strong></p>
          <p>{randomHabit.description}</p>
        </section>
      )}

      <section className="habit-list">
        <h2>All Habits</h2>
        <ul>
          {habits.map((habit) => (
            <li key={habit._id}>
              <strong>{habit.title}</strong> - {habit.description} ({habit.frequency})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
