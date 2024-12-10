import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);  // Track redirection path

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Input validation
    if (!username || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://saisankar.up.railway.app/user/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Handle non-JSON response
      if (!response.ok) {
        const message = await response.text();  // Read as text in case it's not JSON
        throw new Error(message || 'Unknown error');
      }

      const data = await response.json();
      console.log('Response Data:', data);

      // Check for unsuccessful login attempt
      if (!data || !data.id || !data.role) {
        setError('Invalid credentials');
        return;
      }

      // Successful login: Set local storage and redirect based on role
      switch (data.role) {
        case 'client':
          localStorage.setItem('authToken', 'client');
          localStorage.setItem('clientid', data.role_specified_id);
          localStorage.setItem('username', data.username);
          setRedirectTo('/user');  // Redirect to user page
          break;
        case 'admin':
          localStorage.setItem('authToken', 'admin');
          localStorage.setItem('clientid', data.id);
          setRedirectTo('/admin');  // Redirect to admin page
          break;
        case 'professional':
          localStorage.setItem('authToken', 'professional');
          localStorage.setItem('profid', data.role_specified_id);
          localStorage.setItem('clientid', data.id);
          setRedirectTo('/professional');  // Redirect to professional page
          break;
        default:
          setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.message === 'Failed to fetch') {
        setError('Unable to connect to the server. SERVER DOWN.');
      } else {
        setError(error.message || 'Invalid credentials');
      }
    } finally {
      setIsLoading(false); // Hide the loading spinner
    }
  };

  // Canvas animation setup (optional and unrelated to login functionality)
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const particles = [];
    const numParticles = 100;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }

    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.2) this.size -= 0.1;
    };

    Particle.prototype.draw = function () {
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    function createParticles(e) {
      const xPos = e.x;
      const yPos = e.y;

      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(xPos, yPos));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', createParticles);
    animate();

    return () => {
      window.removeEventListener('mousemove', createParticles); // Clean up on component unmount
    };
  }, []);

  // Conditionally redirect using the Navigate component if redirectTo is set
  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div className="login-page">
      <div className="gradient-background"></div>
      <canvas id="canvas"></canvas>

      <div className="login-container">
        <h2>Sign in to your account</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-field">
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>

          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="signup-link">
          Don't have an account?{' '}
          <a href="/register" className="link">
            Sign up
          </a>
        </div>
      </div>

      {/* Inject CSS styles directly into the page */}
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          background: none;
        }

        .gradient-background {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(270deg, #FF6F61, #D83F62, #FFB347);
          background-size: 600% 600%;
          animation: gradientAnimation 15s ease infinite;
          z-index: 1;
        }

        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        #canvas {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 2;
        }

        .login-container {
          position: relative;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 400px;
          text-align: center;
          z-index: 4;
          box-sizing: border-box;
        }

        .login-container h2 {
          color: #333;
          font-size: 2em;
          margin-bottom: 20px;
        }

        .input-field {
          margin-bottom: 16px;
        }

        .input {
          width: 100%;
          padding: 15px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1em;
        }

        .submit-button {
          width: 100%;
          padding: 15px;
          margin: 20px 0;
          background-color: #4CAF50;
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 1em;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .submit-button:hover {
          background-color: #45a049;
        }

        .error-message {
          color: red;
          font-size: 0.9em;
          margin-top: 10px;
        }

        .signup-link {
          display: block;
          margin-top: 20px;
          color: #333;
          text-decoration: none;
        }

        .signup-link:hover {
          text-decoration: underline;
        }
      `}} />
    </div>
  );
};

export default LoginPage;
