import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard({ token, user, onLogout }) {
  const [currentUser, setCurrentUser] = useState(
    user || JSON.parse(localStorage.getItem("user")) || null
  );
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ title: "", description: "", frequency: "daily" });
  const [dailyHabit, setDailyHabit] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser && token) {
      (async () => {
        try {
          const res = await fetch("http://localhost:5000/api/users/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setCurrentUser(data.user || data);
          } else {
            console.warn("Profile fetch returned", res.status);
          }
        } catch (err) {
          console.warn("Failed to fetch profile:", err.message);
        }
      })();
    }
    fetchHabits();
  }, [token, currentUser]);

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/habits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch habits: ${res.status} ${text}`);
      }
      const data = await res.json();
      setHabits(data);
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setDailyHabit(data[randomIndex]);
      }
    } catch (err) {
      setError(err.message);
      console.error("Fetch habits error:", err.message);
      if (err.message.includes("401")) onLogout(); // Invalid token → logout
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newHabit),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to add habit: ${res.status} ${text}`);
      }
      setNewHabit({ title: "", description: "", frequency: "daily" });
      fetchHabits(); // Refresh habits
    } catch (err) {
      setError(err.message);
      console.error("Add habit error:", err.message);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/habits/${habitId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to delete habit: ${res.status} ${text}`);
      }
      fetchHabits(); // Refresh habits
    } catch (err) {
      setError(err.message);
      console.error("Delete habit error:", err.message);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const WelcomeMessage = ({ currentUser }) => {
    const greeting = getGreeting();
    return (
      <div className="welcome">
        {currentUser?.name ? `${greeting}, ${currentUser.name}` : `${greeting}!`}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="brand">
          <h1>Habit Randomizer</h1>
        </div>
        <div className="header-right">
          <WelcomeMessage currentUser={currentUser} />
          <button className="btn logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="card greeting-card">
          <h2>{currentUser?.name ? `${getGreeting()}, ${currentUser.name}` : `${getGreeting()}!`}</h2>
          <p className="muted">Welcome to your Habit Randomizer dashboard!</p>
        </section>

        <section className="card habit-form">
          <h2>Add a Habit</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleAddHabit}>
            <input
              type="text"
              value={newHabit.title}
              onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
              placeholder="Habit title"
              required
            />
            <input
              type="text"
              value={newHabit.description}
              onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
              placeholder="Description (optional)"
            />
            <select
              value={newHabit.frequency}
              onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="custom">Custom</option>
            </select>
            <button type="submit" disabled={loading}>
              Add Habit
            </button>
          </form>
        </section>

        <section className="card habit-list">
          <h2>Your Habits</h2>
          {loading ? (
            <p>Loading...</p>
          ) : habits.length === 0 ? (
            <p className="muted">No habits yet. Add one above!</p>
          ) : (
            <ul>
              {habits.map((habit) => (
                <li key={habit._id}>
                  <strong>{habit.title}</strong>
                  {habit.description && <p>{habit.description}</p>}
                  <p>Frequency: {habit.frequency}</p>
                  <button
                    className="btn delete"
                    onClick={() => handleDeleteHabit(habit._id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {dailyHabit && (
          <section className="card daily-habit">
            <h2>Today's Habit</h2>
            <p>
              <strong>{dailyHabit.title}</strong> ({dailyHabit.frequency})
            </p>
            {dailyHabit.description && <p>{dailyHabit.description}</p>}
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;