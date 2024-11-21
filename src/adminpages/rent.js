import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rentsadmin.css";

const AdminPanel = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token");
   
  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/rent-car");
      setPendingRequests(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to fetch pending requests.");
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/admin/accept-request/${id}`);
      setSuccessMessage("Rental request approved successfully!");
      fetchPendingRequests(); // Reload the pending requests after action
    } catch (error) {
      setErrorMessage("Failed to approve rental request.");
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/admin/decline-request/${id}`);
      setSuccessMessage("Rental request rejected successfully!");
      fetchPendingRequests(); // Reload the pending requests after action
    } catch (error) {
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
                <td>{request.customer.firstname}</td>
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
