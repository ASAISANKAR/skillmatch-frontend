import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/user/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Response Data:', data);

      if (!response.ok || response.status === 401 || response.status === 403) {
        setError('Invalid credentials');
        return;
      }


      if (data && data.id && data.role) {
        
        alert(data.role);
        switch (data.role) {
          case 'client':
            localStorage.setItem('authToken', `client`);
            localStorage.setItem('clientid', data.role_specified_id);
            localStorage.setItem('username', data.username)
            window.location.href = '/user';
            break;
          case 'admin':
            localStorage.setItem('authToken', `admin`);
            localStorage.setItem('clientid', data.id);
            window.location.href = '/admin';
            break;
          case 'professional':
            localStorage.setItem('authToken', `professional`);
            localStorage.setItem('profid', data.role_specified_id);
            localStorage.setItem('clientid', data.id);
            window.location.href = '/professional';
            break;
          default:
            setError('Invalid credentials');
        }
      }
       else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Set error message based on the type of error
      if (error.message === 'Failed to fetch') {
        setError('Unable to connect to the server. SERVER  DOWN.');
      } else {
        setError('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      padding: '48px 24px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '24px',
          color: '#1f2937'
        }}>
          Sign in to your account
        </h2>
        
        {error && (
          <div style={{
            padding: '12px',
            marginBottom: '16px',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ marginTop: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                marginBottom: '12px',
                fontSize: '14px'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                fontSize: '14px'
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '8px 16px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              opacity: isLoading ? '0.7' : '1'
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          fontSize: '14px',
          color: '#4b5563'
        }}>
          Don't have an account?{' '}
          <a
            href="/register"
            style={{
              color: '#4f46e5',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;