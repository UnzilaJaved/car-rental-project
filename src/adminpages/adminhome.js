// AdminDashboard.js
import React, { useState } from 'react';
import './adminhome.css';
import Sidebar from './sidebaradmin';
import Header from './adminheader';
import UserTable from './usertable';
import UserData from './userData';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = UserData.filter(user =>
    user.firstname.toLowerCase().includes(searchTerm) ||
    user.lastname.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    user.phone.includes(searchTerm)
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header onSearch={handleSearch} />
        <UserTable userData={filteredData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
