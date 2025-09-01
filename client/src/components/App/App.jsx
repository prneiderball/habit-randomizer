// components/App/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import Dashboard from "../Dashboard/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Optional: handle login token persistency
  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!token ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!token ? <RegisterForm onRegister={handleLogin} /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={token ? <Dashboard onLogout={handleLogout} token={token} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
