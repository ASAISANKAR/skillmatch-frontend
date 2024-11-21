import React from 'react';
import './AdminPage.css';
import { useEffect } from 'react';

const AdminPage = () => {


  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
      if (!authToken || authToken !== 'admin') {
  window.location.href = '/login';
  return;
}
  }, []);

   const handleLogout = () => {
    localStorage.removeItem('authToken');  
    window.location.href = '/login';
  };



  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <section className="admin-content">
        <p>Manage platform settings, user roles, and service listings.</p>
        <div className="admin-buttons">
          <button className="admin-btn">Manage Users</button>
          <button className="admin-btn">Review Service Listings</button>
          <button className="admin-btn">Platform Settings</button>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
