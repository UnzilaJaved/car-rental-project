import React from "react";
import './adminhome.css';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ onSearch }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove the token from localStorage
    navigate("/");  // Redirect to login page
  };
;

  return (
    <div className="header">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search for users"
        className="search-input"
        onChange={(e) => onSearch(e)} // Ensure that onSearch is called correctly
      />

      {/* Logout button */}
      <Nav.Link href="#" className="me-2" onClick={handleLogout}>
        <button className="logout-button">Logout</button>
      </Nav.Link>
    </div>
  );
};

export default Header;
