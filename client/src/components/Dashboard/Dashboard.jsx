// client/src/components/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard({ token, user, onLogout }) {
  // Use user prop (from App) or fallback to localStorage if App didn't pass it
  const [currentUser, setCurrentUser] = useState(
    user || JSON.parse(localStorage.getItem("user")) || null
  );

  // If we don't have user info, try fetching /api/users/me (protected)
  useEffect(() => {
    if (!currentUser && token) {
      (async () => {
        try {
          const res = await fetch("/api/users/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            // backend might return { user: { ... } } or just the user object
            setCurrentUser(data.user || data);
          } else {
            // not critical — we'll still show a neutral greeting
            console.warn("Profile fetch returned", res.status);
          }
        } catch (err) {
          console.warn("Failed to fetch profile:", err.message);
        }
      })();
    }
  }, [token, currentUser]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="brand">
          <h1>Habit Randomizer</h1>
        </div>
        <div className="header-right">
          <div className="welcome">
            {currentUser?.name ? `Welcome, ${currentUser.name}` : "Welcome!"}
          </div>
          <button className="btn logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="card greeting-card">
          <h2>{currentUser?.name ? `Hi, ${currentUser.name}` : "Hello!"}</h2>
          <p className="muted">This is your dashboard. We'll add habits and the randomizer next.</p>
        </section>

        {/* Placeholder for future sections: Randomizer, Add Habit, Habit List */}
      </main>
    </div>
  );
}

export default Dashboard;
