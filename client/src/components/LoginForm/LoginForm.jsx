import React from "react";

function LoginForm({ onLogin }) {
  return (
    <div>
      <h2>Login Form (placeholder)</h2>
      <button onClick={() => onLogin("fake-token")}>Login</button>
    </div>
  );
}

export default LoginForm;