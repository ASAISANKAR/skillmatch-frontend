import React from 'react';
import './homepage.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Homepage() {


 

  return (
    <div className="home-container">
      <div className="auth-buttons-container">
        <Link to="/login"><Button className="auth-button login-button">Login</Button></Link>
        <Link to="/register"><Button className="auth-button signup-button">Sign Up</Button></Link>
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

      <footer className="footer-section">
        <p>&copy; 2024 Service Finder - All rights reserved.</p>
      </footer>


      
    </div>
  );
}

export default Homepage;
