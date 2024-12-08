import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components for the form and other elements
const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #ffab6b, #ffbe84);
  position: relative;
  overflow: hidden;
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -100%;
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    animation: movingLines 5s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 20%;
    left: 50%;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    animation: rotatingShapes 15s linear infinite;
    transform-origin: center;
  }
`;

const CursorEffect = styled.div`
  position: absolute;
  background: rgba(255, 195, 0, 0.6);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  pointer-events: none;
`;

const AuthForm = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #ffab6b;
    background-color: #fff;
  }

  &::placeholder {
    color: #999;
    opacity: 0.7;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  border: 2px solid #ddd;
  background-color: #f9f9f9;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #ffab6b;
    background-color: #fff;
  }
`;

const AuthButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #ffab6b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ffbe84;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Paragraph = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
`;

const Link = styled.a`
  text-decoration: none;
  color: #ffab6b;

  &:hover {
    text-decoration: underline;
  }
`;

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
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const validateEmail = (email) => {
    return email.includes('@gmail.com');
  };

  const validatePhoneNumber = (number) => {
    return number.length === 10;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !number || !password || !confirmPassword || !role || !address) {
      setError('Please fill in all fields');
    } else if (!validateEmail(email)) {
      setError('Email should contain "@gmail.com"');
    } else if (!validatePhoneNumber(number)) {
      setError('Phone number should contain exactly 10 digits');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      console.log('Data going to the server:', { name, email, number, address, role, password, aadhar, age, profilePhoto, services });

      const requestBody = { name, email, number, address, role, password };

      if (role === 'professional') {
        requestBody.aadhar = aadhar;
        requestBody.age = age;
        requestBody.profilePhoto = profilePhoto;
        requestBody.services = services;
      }

      const endpoint = role === 'client' ? 'https://saisankar.up.railway.app/client/add' : 'https://saisankar.up.railway.app/professional/add';

      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          window.location.href = '/login';
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <AuthContainer>
      <BackgroundShapes />
      <CursorEffect
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />
      <AuthForm>
        <h2>Sign Up</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleRegister}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Phone Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </FormGroup>

          {role === 'professional' && (
            <FormGroup>
              <Input
                type="text"
                placeholder="Aadhar Number"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Profile Photo URL"
                value={profilePhoto}
                onChange={(e) => setProfilePhoto(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Services (Comma separated)"
                value={services}
                onChange={(e) => setServices(e.target.value)}
              />
            </FormGroup>
          )}

          <FormGroup>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="role">Select Role:</label>
            <Select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="client">Client</option>
              <option value="professional">Professional</option>
            </Select>
          </FormGroup>

          <AuthButton type="submit">Sign Up</AuthButton>
        </form>
        <Paragraph>
          Already have an account? <Link href="/login">Login</Link>
        </Paragraph>
      </AuthForm>
    </AuthContainer>
  );
}

export default RegisterPage;
