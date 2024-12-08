import React from 'react';
import './homepage.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

// Import video file
import videoSrc from './video.mp4'; // Make sure the path is correct

function Homepage() {
  return (
    <div className="home-container">
      {/* Video Background */}
      <div className="video-background">
        <video src={videoSrc} autoPlay muted loop className="video-content"></video>
      </div>

      {/* Content Overlay Section */}
      <div className="content-overlay">
        {/* Auth Buttons */}
        <div className="auth-buttons-container">
          <Link to="/login">
            <Button className="auth-button login-button">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="auth-button signup-button">Sign Up</Button>
          </Link>
        </div>

        {/* Hero Section */}
        <header className="hero-section">
          <h1>Find the Right Professional for Your Needs</h1>
          <p>Browse top professionals, hire the right one for the job, and get results.</p>
        </header>

        {/* Features Section */}
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

        {/* Content Management Section */}
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

      {/* Footer Section */}
      <footer className="footer-section">
        <p>&copy; 2024 Service Finder - All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
