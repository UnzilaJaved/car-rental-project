import React, { useState, useEffect } from "react";
import axios from "axios";
import './adminhome.css';

const UserTable = ({ searchTerm }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const USERS_API_URL = "http://127.0.0.1:8000/api/admin/customers"; // Update with your actual API URL
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch user data
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(USERS_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data); // Assuming the response is an array of users
    } catch (error) {
      setErrorMessage("Failed to fetch users.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter user data based on searchTerm
  const filteredData = userData.filter(user =>
    (user.first_name || '').toLowerCase().includes(searchTerm) ||
    (user.last_name || '').toLowerCase().includes(searchTerm) ||
    (user.email || '').toLowerCase().includes(searchTerm) ||
    (user.phone_number || '').toLowerCase().includes(searchTerm)
  );

  return (
    <div className="user-table">
      <h2>Customer List</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {loading ? (
        <p>Loading customer data...</p>
      ) : filteredData.length === 0 ? (
        <p>No customers found!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Telephone</th>
          
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
