import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/SignUp';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import ProfessionalPage from './components/ProfessionalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/professional' element={<ProfessionalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
