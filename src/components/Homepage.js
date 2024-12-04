import React, { useEffect, useState } from 'react';
import './homepage.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Homepage() {
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [success, setSuccess] = useState(false);  // Success state

  useEffect(() => {
    const getIpAndSystemInfo = async () => {
      try {
        setLoading(true);  // Set loading to true while fetching

        // Fetch IP Address using ipify API
        const ipRes = await fetch('https://api.ipify.org?format=json');
        if (!ipRes.ok) throw new Error('Failed to fetch IP address');
        const ipData = await ipRes.json();
        const ipAddress = ipData.ip;

        // Capture System Information
        const systemInfo = {
          userAgent: navigator.userAgent,  // Browser and device info
          platform: navigator.platform,    // OS info
        };

        // Send data to backend
        const response = await fetch('https://ipscan-nine.vercel.app/api/hello', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ipAddress, systemInfo }),
        });

        if (!response.ok) throw new Error('Failed to send user info to the backend');

        const data = await response.json();

        // On successful response
        setSuccess(true);
        setError(null);  // Clear any existing errors
        console.log('User info stored successfully:', data.message);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError(error.message);  // Set error state
      } finally {
        setLoading(false);  // Set loading to false after operation
      }
    };

    getIpAndSystemInfo();
  }, []);

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

      {/* Conditional rendering for loading, success, and error */}
      {loading && <div className="loading-message">Sending your info...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      {success && <div className="success-message">User information sent successfully!</div>}
    </div>
  );
}

export default Homepage;
