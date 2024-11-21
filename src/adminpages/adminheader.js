import React from "react";
import './adminhome.css';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios'; // Import axios for making API requests

const Header = ({ onSearch }) => {
  const navigate = useNavigate(); // Use navigate hook for programmatic navigation

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Send a request to the backend to log the admin out
      const response = await axios.get('http://127.0.0.1:8000/api/auth/admin/logout', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Send the token if needed for backend authentication
        }
      });

      if (response.status === 200) {
        // Remove the token from localStorage
        localStorage.removeItem("token");

        // Optionally, you can also clear sessionStorage
        // sessionStorage.removeItem("token");

        // Redirect to the login page after logout
        navigate('/adminhome'); // Navigate to the login page (adjust to your actual login route)
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle error (optional)
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
