import React from 'react';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
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
