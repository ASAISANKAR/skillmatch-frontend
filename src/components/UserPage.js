import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import './UserPage.css';

const UserPage = () => {
  const [professionals, setProfessionals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedProfessionals, setBookedProfessionals] = useState([]);  
  const navigate = useNavigate();  // Initialize navigate hook

  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); 
    if (!authToken || authToken !== 'client') {
      navigate('/login');  // Use navigate for redirection
      return;
    }

    Promise.all([
      fetch('https://saisankar.up.railway.app/user/getprof').then(response => response.json()),
      fetch('https://saisankar.up.railway.app/client/booked-professionals', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      }).then(response => response.json()),
    ])
    .then(([professionalsData, bookedData]) => {
      setProfessionals(professionalsData);
      setBookedProfessionals(Array.isArray(bookedData) ? bookedData : []);  
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [navigate]);  // Add navigate to dependencies for useEffect

  useEffect(() => {
    console.log('Updated booked professionals:', bookedProfessionals);
  }, [bookedProfessionals]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('clientid');
    localStorage.removeItem('username');
    navigate('/login');  // Use navigate for redirection
  };

  const handleBookProfessional = (professionalId) => {
    setBookedProfessionals(prevState => {
      const updatedSet = new Set(prevState);
      updatedSet.add(professionalId);
      return Array.from(updatedSet); 
    });

    const userId = localStorage.getItem('clientid');
    const professionalid = parseInt(professionalId);
    const responsebody = { professionalid, userid: parseInt(userId) };

    fetch('https://saisankar.up.railway.app/client/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(responsebody),
    })
    .then(response => response.json())
    .then(data => {
      if (data.userid === userId && data.professionalid === professionalid) {
        alert('Booking successful. Redirecting to booking page...');
        navigate('/user');  // Use navigate for redirection
      } else {
        alert('Booking failed. Please try again.');
      }
    })
    .catch(error => {
      alert('An error occurred while booking. Please try again later.');
    });
  };

  const filteredProfessionals = professionals.filter(professional =>
    professional.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-page">
      <header className="user-header">
        <h1 align="center">User Dashboard</h1>
        <h2 align='right'>Welcome, {localStorage.getItem('username')}</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <section className="user-content">
        <input
          type="text"
          placeholder="Search for professionals..."
          className="user-search-bar"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="professional-list">
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map(professional => {
              const isBooked = bookedProfessionals.some(booked => booked.professionalid === professional.id && booked.userid === parseInt(localStorage.getItem('clientid')));
              return (
                <div className="professional-card" key={professional.id}>
                  <div className="image-container">
                    <img src={professional.profilePhoto} alt="Profile" className="profile-photo" />
                  </div>
                  <h3>{professional.name}</h3>
                  <p><strong>Address:</strong> {professional.address}</p>
                  <p><strong>Contact Number:</strong> {professional.number}</p>
                  <p><strong>Services:</strong> {professional.services || 'No services available'}</p>
                  <button 
                    className="book-button" 
                    onClick={() => handleBookProfessional(professional.id)}
                    disabled={isBooked}
                  >
                    {isBooked ? 'Booked' : 'Book Professional'}
                  </button>
                </div>
              );
            })
          ) : (
            <p>No professionals found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserPage;
