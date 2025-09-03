import React, { useState, useEffect, useCallback } from "react";
import "./Dashboard.css";

function Dashboard({ token, user, onLogout }) {
  const [authToken, setAuthToken] = useState(token || null);
  const [currentUser, setCurrentUser] = useState(user || null);
  const [habits, setHabits] = useState([]);
  const [dailyHabit, setDailyHabit] = useState(null);
  const [newHabit, setNewHabit] = useState({ title: "", description: "", frequency: "daily" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync token/user
  useEffect(() => {
    if (token) setAuthToken(token);
    if (user) setCurrentUser(user);
  }, [token, user]);

  const fetchHabits = useCallback(async () => {
    if (!authToken) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/habits", {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized – please log in again.");
        const text = await res.text();
        throw new Error(`Failed to fetch habits: ${res.status} ${text}`);
      }

      const data = await res.json();
      setHabits(data);

      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setDailyHabit(data[randomIndex]);
      } else {
        setDailyHabit(null);
      }
    } catch (err) {
      setError(err.message);
      if (err.message.includes("Unauthorized")) handleLogout();
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!authToken) return;
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify(newHabit),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to add habit: ${res.status} ${text}`);
      }

      setNewHabit({ title: "", description: "", frequency: "daily" });
      fetchHabits();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    if (!authToken) return;
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/api/habits/${habitId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to delete habit: ${res.status} ${text}`);
      }

      fetchHabits();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setCurrentUser(null);
    onLogout && onLogout();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Habit Randomizer</h1>
        <div>
          <span>{currentUser?.name ? `${getGreeting()}, ${currentUser.name}` : getGreeting()}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main>
        <section className="habit-form card">
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
            <button type="submit" disabled={loading}>Add Habit</button>
          </form>
        </section>

        <section className="habit-list card">
          <h2>Your Habits</h2>
          {loading ? <p>Loading...</p> : habits.length === 0 ? <p>No habits yet.</p> : (
            <ul>
              {habits.map(habit => (
                <li key={habit._id}>
                  <strong>{habit.title}</strong> ({habit.frequency})
                  {habit.description && <p>{habit.description}</p>}
                  <button onClick={() => handleDeleteHabit(habit._id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {dailyHabit && (
          <section className="daily-habit card">
            <h2>Today's Habit</h2>
            <p><strong>{dailyHabit.title}</strong> ({dailyHabit.frequency})</p>
            {dailyHabit.description && <p>{dailyHabit.description}</p>}
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
