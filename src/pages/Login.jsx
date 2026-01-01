import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault()

      if (password.length < 4){
        setError("Password must be at least 4 characters");
      return;
      }

      login(username);
      navigate("/dashboard");
    }

  return (
    <>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} className="submit-form">
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.trimStart())}
            required
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trimStart())}
            required
            />
            <button type="submit">Login</button>
        </form>
    </>
  )
}
