import React, { useState } from 'react';
import './adminhome.css';
import Sidebar from './sidebaradmin';
import Header from './adminheader';
import UserTable from './usertable';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header onSearch={handleSearch} />
        {/* Pass the searchTerm to UserTable */}
        <UserTable searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default AdminDashboard;
