import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import Dashboard from "../Dashboard/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const handleLogin = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (!token) setUser(null);
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !token ? (
              <div className="centered-container">
                <LoginForm onLogin={handleLogin} />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !token ? (
              <div className="centered-container">
                <RegisterForm onRegister={handleLogin} />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/"
          element={
            token ? (
              <Dashboard token={token} user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
