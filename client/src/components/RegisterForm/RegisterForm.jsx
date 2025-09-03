import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App/App.css";
import "./RegisterForm.css";

function RegisterForm({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const sanitize = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email);
    const sanitizedPassword = sanitize(password);

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizedName,
          email: sanitizedEmail,
          password: sanitizedPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      onRegister(data.token, data.user);
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default RegisterForm;
