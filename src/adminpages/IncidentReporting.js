import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Incident.css";

const IncidentReporting = () => {
  const [incidents, setIncidents] = useState([]);
  const [newIncident, setNewIncident] = useState({
    vehicleID: "",
    bookingID: "",
    incidentDate: "",
    description: "",
    damageCost: "",
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/incidents");
      setIncidents(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to load incidents. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncident = async () => {
    try {
      await axios.post("http://localhost:5000/admin/incidents", newIncident);
      alert("Incident added successfully!");
      setNewIncident({
        vehicleID: "",
        bookingID: "",
        incidentDate: "",
        description: "",
        damageCost: "",
      });
      fetchIncidents();
    } catch (error) {
      setErrorMessage("Failed to add incident. Please try again.");
    }
  };

  const handleDeleteIncident = async (incidentId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/incidents/${incidentId}`);
      alert("Incident deleted successfully!");
      fetchIncidents();
    } catch (error) {
      setErrorMessage("Failed to delete incident. Please try again.");
    }
  };

  return (
    <div className="incident-container">
      <h2>Incident Reporting</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {loading ? (
        <p>Loading incidents...</p>
      ) : incidents.length === 0 ? (
        <div className="empty-state">
          <p>No incidents found. Try adding a new one!</p>
        </div>
      ) : (
        <div className="incident-list">
          <h3>Existing Incidents</h3>
          <ul>
            {incidents.map((incident) => (
              <li key={incident.incidentID} className="incident-item">
                <div>
                  <p><strong>Vehicle ID:</strong> {incident.vehicleID}</p>
                  <p><strong>Booking ID:</strong> {incident.bookingID}</p>
                  <p><strong>Date:</strong> {incident.incidentDate}</p>
                  <p><strong>Description:</strong> {incident.description}</p>
                  <p><strong>Damage Cost:</strong> {incident.damageCost}</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteIncident(incident.incidentID)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-container">
        <h3>Add New Incident</h3>
        <label>Vehicle ID:</label>
        <input
          type="text"
          value={newIncident.vehicleID}
          onChange={(e) => setNewIncident({ ...newIncident, vehicleID: e.target.value })}
        />
        <label>Booking ID:</label>
        <input
          type="text"
          value={newIncident.bookingID}
          onChange={(e) => setNewIncident({ ...newIncident, bookingID: e.target.value })}
        />
        <label>Date:</label>
        <input
          type="date"
          value={newIncident.incidentDate}
          onChange={(e) => setNewIncident({ ...newIncident, incidentDate: e.target.value })}
        />
        <label>Description:</label>
        <textarea
          value={newIncident.description}
          onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
        ></textarea>
        <label>Damage Cost:</label>
        <input
          type="number"
          value={newIncident.damageCost}
          onChange={(e) => setNewIncident({ ...newIncident, damageCost: e.target.value })}
        />
        <button className="add-btn" onClick={handleAddIncident}>
          Add Incident
        </button>
      </div>
    </div>
  );
};

export default IncidentReporting;
