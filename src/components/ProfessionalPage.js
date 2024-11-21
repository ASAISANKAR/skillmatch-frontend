import React, { useState, useEffect } from 'react';
import './ProfessionalPage.css';

const ProfessionalPage = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [profileDetails, setProfileDetails] = useState({
    id: '',
    name: '',
    email: '',
    number: '',
    aadhar: '',
    address: '',
    age: '',
    password: '',
    profilePhoto: '',
    services: '',
  });
  const [bookings, setBookings] = useState([]);  // State to hold bookings
  const [showBookings, setShowBookings] = useState(false);  // State to toggle bookings visibility

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken || authToken !== 'professional') {
      window.location.href = '/login';
      return;
    }
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      const id = localStorage.getItem('profid');
      const response = await fetch(`http://localhost:8080/professional/get?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const data = await response.json();
      setProfileDetails(data);
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const id = localStorage.getItem('profid');
      const response = await fetch(`http://localhost:8080/professional/bookings?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleEditClick = () => {
    setShowEditForm(!showEditForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/professional/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(profileDetails),
      });
      if (response.ok) {
        alert('Profile updated successfully!');
        setShowEditForm(false);
        fetchProfileDetails();
      } else {
        alert('Error updating profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBookingsClick = () => {
    setShowBookings(!showBookings);
    if (!showBookings) {
      fetchBookings(); 
    }
  };

  return (
    <div className="professional-page">
      <header className="professional-header">
        <h1>Professional Dashboard</h1>
        <h2 align='right'>Welcome, {profileDetails.name}</h2>
        <img align="right" src={profileDetails.profilePhoto} 
         alt="Profile" 
         style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <section className="professional-content">
        <p>Create and manage profiles, list services, and interact with clients.</p>
        <button className="services-btn" onClick={handleBookingsClick}>
          My Bookings
        </button>
        <button className="profile-btn" onClick={handleEditClick}>
          {showEditForm ? 'Hide Edit Profile' : 'Edit Profile'}
        </button>
      </section>

      {showBookings && (
        <section className="bookings-list">
          <h2>Bookings</h2>
          {bookings.length > 0 ? (
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id}>
                  <p><strong>Client: </strong> {booking.name}</p>
                  <p><strong>Email: </strong>{booking.email}</p>
                  <p><strong>Address: </strong>{booking.address}</p>
                  <p><strong>Mobile Number: </strong>{booking.number}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings available.</p>
          )}
        </section>
      )}

      {showEditForm && (
        <section className="edit-profile-form">
          <h2>Edit Profile</h2>
          
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profileDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={profileDetails.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                name="number"
                value={profileDetails.number}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Aadhar:</label>
              <input
                type="text"
                name="aadhar"
                value={profileDetails.aadhar}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={profileDetails.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={profileDetails.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={profileDetails.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? '🙈' : '👀'}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Services:</label>
              <input
                type="text"
                name="services"
                value={profileDetails.services}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default ProfessionalPage;
