import React, { useState } from 'react';
import './auth.css';


function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setnumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('client'); 
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !number || !password || !confirmPassword || !role || !address) {
      setError('Please fill in all fields');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      console.log('Registered:', { name, email, number,address, role, password });
      if(role === 'client'){
        fetch('http://localhost:8080/client/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, number,address, role, password }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          window.location.href = '/login';
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    else{
      console.log('Wait it takes time to create professional account');
    }
  }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
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
            type="text"
            placeholder="Phone Number"
            value={number}
            onChange={(e) => setnumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="role-select-container">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="client">Client</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <button type="submit" className="auth-button signup-button">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
