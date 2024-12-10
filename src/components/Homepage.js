import React, { useEffect } from 'react';
import './homepage.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useNavigate } from 'react-router-dom'; // Import useNavigate
import videoSrc from './video.mp4';

function Homepage() {
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const sendIpToBackend = async () => {
      try {
        await fetch('http://saisankar.up.railway.app/user/', {
          method: 'GET',
          headers: {
            'User-Agent': navigator.userAgent,
          },
        });
      } catch (error) {
        console.error('Error capturing IP address: ', error);
      }
    };

    sendIpToBackend();
  }, []);

  // Handle login button click to navigate to login page
  const handleLogin = () => {
    navigate('/login');
  };

  // Handle signup button click to navigate to signup page
  const handleSignup = () => {
    navigate('/register');
  };

  return (
    <div className="home-container">
      <div className="video-background">
        <video src={videoSrc} autoPlay muted loop className="video-content"></video>
      </div>
      <div className="content-overlay">
        <div className="auth-buttons-container">
          {/* Using useNavigate for button click */}
          <Button className="auth-button login-button" onClick={handleLogin}>Login</Button>
          <Button className="auth-button signup-button" onClick={handleSignup}>Sign Up</Button>
        </div>
        <header className="hero-section">
          <h1>Find the Right Professional for Your Needs</h1>
          <p>Browse top professionals, hire the right one for the job, and get results.</p>
        </header>
        <section className="features-section">
          <div className="feature-card">
            <h2>Wide Range of Services</h2>
            <p>We connect you with experts in numerous fields.</p>
          </div>
          <div className="feature-card">
            <h2>Verified Professionals</h2>
            <p>Our professionals are verified, skilled, and trustworthy.</p>
          </div>
          <div className="feature-card">
            <h2>Easy & Secure</h2>
            <p>Hire with confidence through our secure platform.</p>
          </div>
        </section>
        <section className="card-section">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Content Management</h5>
              <p className="card-text">
                <ul>
                  <li>Multilingual content</li>
                  <li>Support for various content types</li>
                  <li>User-generated materials</li>
                  <li>Structured storage of learning materials</li>
                </ul>
              </p>
            </div>
          </div>
        </section>
      </div>
      <footer className="footer-section">
        <p>&copy; 2024 Service Finder - All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
