import React,{useEffect} from 'react';
import './ProfessionalPage.css';

const ProfessionalPage = () => {
  const handleLogout = () => {
    // Clear authentication token (assuming it's in localStorage)
    localStorage.removeItem('authToken');

    // Redirect to login page
    window.location.href = '/login';
  };

   useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="professional-page">
      <header className="professional-header">
        <h1>Professional Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <section className="professional-content">
        <p>Create and manage profiles, list services, and interact with clients.</p>
        <button className="profile-btn">Edit Profile</button>
        <button className="services-btn">Add Service</button>
      </section>
    </div>
  );
};

export default ProfessionalPage;
