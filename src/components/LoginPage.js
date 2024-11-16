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
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('clientid',data.id);
        if (data.role === 'client') {
          console.log('Logged in as Client:', { username });
          // Store user session data in localStorage
          localStorage.setItem('authToken', `client-${username}`);
          window.location.href = '/user';
        } else if (data.role === 'admin') {
          console.log('Logged in as Admin:', { username });
          localStorage.setItem('authToken', `admin-${username}`);
          window.location.href = '/admin';
        } else if (data.role === 'professional') {
          console.log('Logged in as Professional:', { username });
          localStorage.setItem('authToken', `professional-${username}`);
          window.location.href = '/professional';
        } else {
          setError('Invalid credentials');
          console.log('Not Logged in:', { username });
        }
      })
      .catch((error) => {
        setError('An error occurred while connecting to the server. Please try again.');
        console.error('Error:', error);
      });
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
