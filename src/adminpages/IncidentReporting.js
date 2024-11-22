import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Incident.css";

const IncidentReporting = () => {
  const [incidents, setIncidents] = useState([]);
  const token = localStorage.getItem("token");
  const [newIncident, setNewIncident] = useState({
    vehID: "",  // Matching the column 'veh_id'
    incidentDate: "", // Matching the column 'incident_date'
    description: "",  // Description stays the same
  });
  const [editingIncident, setEditingIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Define the backend API endpoint for incidents
  const INCIDENTS_API_URL = "http://127.0.0.1:8000/api/admin/incidents";

  useEffect(() => {
    fetchIncidents();
  }, []);

  // Fetch incidents from the backend
  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(INCIDENTS_API_URL);
      setIncidents(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to load incidents. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new incident
  const handleAddIncident = async () => {
    if (!newIncident.vehID || !newIncident.incidentDate || !newIncident.description) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      // Sending POST request to create a new incident
      const response = await axios.post(INCIDENTS_API_URL, {
        veh_id: newIncident.vehID,
        incident_date: newIncident.incidentDate,
        description: newIncident.description
      },{headers:{Authorization:`Bearer ${token}`}});

      console.log("Server response:", response); // For debugging
      alert("Incident added successfully!");
      setNewIncident({
        vehID: "",
        incidentDate: "",
        description: "",
      });
      fetchIncidents();
    } catch (error) {
      console.error("Error adding incident:", error);
      setErrorMessage("Failed to add incident. Please try again.");
    }
  };

  // Handle editing an incident
  const handleEditIncident = (incident) => {
    setEditingIncident(incident); // Set the incident to be edited
    setNewIncident({
      vehID: incident.veh_id,
      incidentDate: incident.incident_date,
      description: incident.description,
    });
  };

  // Update an incident
  const handleUpdateIncident = async () => {
    if (!newIncident.vehID || !newIncident.incidentDate || !newIncident.description) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const updatedIncident = {
        veh_id: newIncident.vehID,
        incident_date: newIncident.incidentDate,
        description: newIncident.description,
      };

      const response = await axios.put(
        `${INCIDENTS_API_URL}/${editingIncident.incident_id}`,
        updatedIncident
      );

      alert("Incident updated successfully!");
      setEditingIncident(null); // Clear the edit state
      setNewIncident({ vehID: "", incidentDate: "", description: "" }); // Clear form
      fetchIncidents();
    } catch (error) {
      console.error("Error updating incident:", error);
      setErrorMessage("Failed to update incident. Please try again.");
    }
  };

  // Delete an incident
  const handleDeleteIncident = async (incidentId) => {
    try {
      await axios.delete(`${INCIDENTS_API_URL}/${incidentId}`);
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
              <li key={incident.incident_id} className="incident-item">
                <div>
                  <p><strong>Vehicle ID:</strong> {incident.veh_id}</p>
                  <p><strong>Date:</strong> {incident.incident_date}</p>
                  <p><strong>Description:</strong> {incident.description}</p>
                </div>
                <button
                  className="edit-btn"
                  onClick={() => handleEditIncident(incident)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteIncident(incident.incident_id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-container">
        <h3>{editingIncident ? "Edit Incident" : "Add New Incident"}</h3>
        <label>Vehicle ID:</label>
        <input
          type="text"
          value={newIncident.vehID}
          onChange={(e) =>
            setNewIncident({ ...newIncident, vehID: e.target.value })
          }
        />
        <label>Date:</label>
        <input
          type="date"
          value={newIncident.incidentDate}
          onChange={(e) =>
            setNewIncident({ ...newIncident, incidentDate: e.target.value })
          }
        />
        <label>Description:</label>
        <textarea
          value={newIncident.description}
          onChange={(e) =>
            setNewIncident({ ...newIncident, description: e.target.value })
          }
        ></textarea>
        <button
          className="add-btn"
          onClick={editingIncident ? handleUpdateIncident : handleAddIncident}
        >
          {editingIncident ? "Update Incident" : "Add Incident"}
        </button>
      </div>
    </div>
  );
};

export default IncidentReporting;
