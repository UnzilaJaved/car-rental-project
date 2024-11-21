import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rentsadmin.css";

const AdminPanel = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token"); // Fetch token from localStorage

  // Fetch pending requests on component mount
  useEffect(() => {
    fetchPendingRequests();
  }, []);

  // Function to fetch pending rental requests
  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin/pending-requests", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token for authentication
        },
      });

      // Ensure the response contains data and update the state
      if (response.data && response.data.data) {
        setPendingRequests(response.data.data); // Adjust if the API structure is different
      } else {
        setErrorMessage("No data found or invalid response format.");
      }
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      setErrorMessage("Failed to fetch pending requests.");
    }
  };

  // Handle accepting a rental request
  const handleAccept = async (id) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/accept-request/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );
      setSuccessMessage("Rental request approved successfully!");
      fetchPendingRequests(); // Reload pending requests after accepting
    } catch (error) {
      console.error("Error approving rental request:", error);
      setErrorMessage("Failed to approve rental request.");
    }
  };

  // Handle declining a rental request
  const handleDecline = async (id) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/decline-request/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );
      setSuccessMessage("Rental request rejected successfully!");
      fetchPendingRequests(); // Reload pending requests after declining
    } catch (error) {
      console.error("Error rejecting rental request:", error);
      setErrorMessage("Failed to reject rental request.");
    }
  };

  return (
    <div className="admin-panel">
      <h2>Pending Rental Requests</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <table className="rental-requests-table">
        <thead>
          <tr>
            <th>Car</th>
            <th>Customer</th>
            <th>Rental Dates</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.vehicle.model}</td>
                <td>{request.customer.firstname} {request.customer.lastname}</td>
                <td>{request.start_date} to {request.end_date}</td>
                <td>{request.total_price} MAD</td>
                <td>{request.status}</td>
                <td>
                  <button onClick={() => handleAccept(request.id)}>Approve</button>
                  <button onClick={() => handleDecline(request.id)}>Reject</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No pending requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
