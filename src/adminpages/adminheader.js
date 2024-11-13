// Header.js
import React from "react";
import './adminhome.css';
import Nav from 'react-bootstrap/Nav';
const Header = ({ onSearch }) => (
  <div className="header">
    <input
      type="text"
      placeholder="Search for users"
      className="search-input"
      onChange={onSearch}
    />
    <Nav.Link href="/" className="me-2">
    <button className="logout-button">Logout</button>
    </Nav.Link>
    
  </div>
);

export default Header;
