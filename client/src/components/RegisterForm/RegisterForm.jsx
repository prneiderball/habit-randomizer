import React from "react";

function RegisterForm({ onRegister }) {
  return (
    <div>
      <h2>Register Form (placeholder)</h2>
      <button onClick={() => onRegister("fake-token")}>Register</button>
    </div>
  );
}

export default RegisterForm;
