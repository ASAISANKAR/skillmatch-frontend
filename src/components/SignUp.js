import React, { useState } from 'react';
import './auth.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('client');
  const [aadhar, setAadhar] = useState('');
  const [age, setAge] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [services, setServices] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !number || !password || !confirmPassword || !role || !address) {
      setError('Please fill in all fields');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      console.log('Data Going to the server::', { name, email, number, address, role, password, aadhar, age, profilePhoto, services });

      const requestBody = { name, email, number, address, role, password };

      if (role === 'professional') {
        requestBody.aadhar = aadhar;
        requestBody.age = age;
        requestBody.profilePhoto = profilePhoto;
        requestBody.services = services;
      }

      const endpoint = role === 'client' ? 'http://localhost:8080/client/add' : 'http://localhost:8080/professional/add';

      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
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
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
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
              onChange={(e) => setNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {role === 'professional' && (
            <div className="form-group professional-fields">
              <input
                type="text"
                placeholder="Aadhar Number"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Profile Photo URL"
                value={profilePhoto}
                onChange={(e) => setProfilePhoto(e.target.value)}
              />
              <input
                type="text"
                placeholder="Services (Comma separated)"
                value={services}
                onChange={(e) => setServices(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
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
          </div>

          <div className="role-select-container">
            <label htmlFor="role">Select Role:</label>
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
