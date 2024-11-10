import React, { useState } from 'react';
import './auth.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields');
    } else {
        fetch('http://localhost:8080/user/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then((response) => response.text())
        .then((data) => {
            if (data === 'success') {
                console.log('Logged in:', { username, password });
                // Redirect to homepage or dashboard after successful login
            } else {
                setError('Invalid credentials');
                setError('');
                console.log('Not Logged in:', { username, password });
            }
        })
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button login-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
