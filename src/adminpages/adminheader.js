import React from "react";
import './adminhome.css';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ onSearch }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // API call to log the admin out
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/admin/logout',
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        // Clear the token from localStorage
        localStorage.removeItem("token");

        // Redirect to the login page
        navigate('/adminlogin'); // Adjust the route as needed
      } else {
        console.error("Unexpected logout response:", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="header">
      <input
        type="text"
        placeholder="Search for users"
        className="search-input"
        onChange={onSearch}
      />
      <Nav.Link href="#" className="me-2" onClick={handleLogout}>
        <button className="logout-button">Logout</button>
      </Nav.Link>
    </div>
  );
};

export default Header;
