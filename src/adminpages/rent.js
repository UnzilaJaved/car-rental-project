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

  // Fetch pending rental requests
  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/rentals/pending",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && Array.isArray(response.data)) {
        const requests = response.data;

        // Fetch additional details for each request
        const enrichedRequests = await Promise.all(
          requests.map(async (request) => {
            const [vehicleResponse, customerResponse] = await Promise.all([
              axios.get(
                `http://127.0.0.1:8000/api/admin/vehicles/${request.veh_id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              ),
              axios.get(
                `http://127.0.0.1:8000/api/admin/customers/${request.cus_id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              ),
            ]);

            return {
              ...request,
              vehicle: vehicleResponse.data,
              customer: customerResponse.data,
            };
          })
        );

        setPendingRequests(enrichedRequests);
      } else {
        setPendingRequests([]);
        setErrorMessage("No pending requests found.");
      }
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      setErrorMessage("Failed to load pending requests. Please try again.");
    }
  };

  // Approve rental request
  const handleAccept = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/admin/rentals/accept/${id}`,
        {}, // Empty body
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage(`Rental request #${id} approved successfully!`);
      setErrorMessage("");
      fetchPendingRequests();
    } catch (error) {
      console.error("Error approving rental request:", error);
      setErrorMessage("Failed to approve rental request. Please try again.");
    }
  };

  // Reject rental request
  const handleDecline = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/admin/rentals/decline/${id}`,
        {}, // Empty body
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage(`Rental request #${id} rejected successfully!`);
      setErrorMessage("");
      fetchPendingRequests();
    } catch (error) {
      console.error("Error rejecting rental request:", error);
      setErrorMessage("Failed to reject rental request. Please try again.");
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <tr key={request.rental_id}>
                {/* Vehicle Details */}
                <td>
                  {request.vehicle?.brand} {request.vehicle?.model || "N/A"}
                </td>
                {/* Customer Details */}
                <td>
                  {request.customer?.first_name} {request.customer?.last_name}
                </td>
                {/* Rental Dates */}
                <td>
                  {request.start_date} to {request.end_date}
                </td>
                {/* Total Price */}
                <td>{request.total_price} MAD</td>
                {/* Action Buttons */}
                <td>
                  <button
                    onClick={() => handleAccept(request.rental_id)}
                    className="btn btn-approve"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(request.rental_id)}
                    className="btn btn-reject"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No pending requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
