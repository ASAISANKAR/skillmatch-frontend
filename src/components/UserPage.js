import React, { useEffect, useState } from 'react';
import './UserPage.css';

const UserPage = () => {
  const [professionals, setProfessionals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedProfessionals, setBookedProfessionals] = useState([]);  // Ensure this is an array

  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); 
    if (!authToken || authToken !== 'client') {
  window.location.href = '/login';
  return;
}


    Promise.all([
      fetch('http://localhost:8080/user/getprof').then(response => response.json()),
      fetch('http://localhost:8080/client/booked-professionals', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      }).then(response => response.json()),
    ])
    .then(([professionalsData, bookedData]) => {
      console.log('Fetched professionals:', professionalsData);
      console.log('Fetched booked professionals:', bookedData);
      setProfessionals(professionalsData);
      setBookedProfessionals(Array.isArray(bookedData) ? bookedData : []);  // Ensure it's always an array
      console.log('bookedData:', bookedData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  useEffect(() => {
    // Logs the updated state after it has been set
    console.log('Updated booked professionals:', bookedProfessionals);
  }, [bookedProfessionals]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');  
    window.location.href = '/login';
  };

  const handleBookProfessional = (professionalId) => {
    setBookedProfessionals(prevState => {
      // Create a new Set with the existing elements and the new one
      const updatedSet = new Set(prevState);
      updatedSet.add(professionalId);
      return Array.from(updatedSet); // Convert back to array and return
    });

    console.log(`Booking professional with ID: ${professionalId}`);
    alert(`Booking professional with ID: ${professionalId}`);

    const userId = localStorage.getItem('clientid');
    const userid = parseInt(userId);
    const professionalid = parseInt(professionalId);
    const responsebody = { professionalid, userid };

    console.log(responsebody);

    fetch('http://localhost:8080/client/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(responsebody),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Booking response:', data);
        console.log('Booking response:', data.message, data.userid, data.professionalid);
        localStorage.setItem("professionalid", data.professionalid);
        if (data.userid === userid && data.professionalid === professionalid) {
          console.log('Booking successful', data);
          alert('Booking successful. Redirecting to booking page...');
          window.location.href = '/user';
        } else {
          console.error('Booking failed:', data.message);
          alert('Booking failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error booking professional:', error);
        alert('An error occurred while booking. Please try again later.');
      });
  };

  // Filter professionals based on the search query
  const filteredProfessionals = professionals.filter(professional =>
    professional.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-page">
      <header className="users-header">
        <h1 align="center">User Dashboard</h1>
       <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <section className="user-content">
        <p>Search for professionals, hire services, and provide feedback.</p>
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
              const isBooked = bookedProfessionals.some(booked => booked.professionalid === professional.id);

              return (
                <div className="professional-card" key={professional.id}>
                  <img src={professional.profilePhoto} alt="Profile" className="profile-photo" />
                  <h3>{professional.name}</h3>
                  <p><strong>Address:</strong> {professional.address}</p>
                  <p><strong>Contact Number:</strong> {professional.number}</p>
                  <p><strong>Services:</strong> 
                    {professional.services === null ? "No services available" : professional.services}
                  </p>
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
