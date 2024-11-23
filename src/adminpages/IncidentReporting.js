import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Incident.css";

const IncidentReporting = () => {
  const [incidents, setIncidents] = useState([]);
  const [newIncident, setNewIncident] = useState({
    vehID: "",
    incidentDate: "",
    description: "",
  });
  const [editingIncident, setEditingIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const INCIDENTS_API_URL = "http://127.0.0.1:8000/api/admin/incidents";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchIncidents();
  }, []);

  // Fetch incidents
  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(INCIDENTS_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncidents(response.data || []); // Fallback to empty array if no data
    } catch (error) {
      setErrorMessage("Failed to fetch incidents.");
      console.error(error);
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
      const response = await axios.post(
        INCIDENTS_API_URL,
        {
          veh_id: newIncident.vehID,
          incident_date: newIncident.incidentDate,
          description: newIncident.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Incident added successfully!");
      setNewIncident({ vehID: "", incidentDate: "", description: "" });
      fetchIncidents();
    } catch (error) {
      setErrorMessage("Failed to add incident.");
      console.error(error);
    }
  };

  // Edit an incident
  const handleEditIncident = (incident) => {
    setEditingIncident(incident);
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
      const response = await axios.put(
        `${INCIDENTS_API_URL}/${editingIncident.incident_id}`,
        {
          veh_id: newIncident.vehID,
          incident_date: newIncident.incidentDate,
          description: newIncident.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Incident updated successfully!");
      setEditingIncident(null);
      setNewIncident({ vehID: "", incidentDate: "", description: "" });
      fetchIncidents();
    } catch (error) {
      setErrorMessage("Failed to update incident.");
      console.error(error);
    }
  };

  // Delete an incident
  const handleDeleteIncident = async (incidentId) => {
    try {
      await axios.delete(`${INCIDENTS_API_URL}/${incidentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Incident deleted successfully!");
      fetchIncidents();
    } catch (error) {
      setErrorMessage("Failed to delete incident.");
      console.error(error);
    }
  };

  return (
    <div className="incident-container">
      <h2>Incident Reporting</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {loading ? (
        <p>Loading incidents...</p>
      ) : incidents.length === 0 ? (
        <p>No incidents found. Try adding a new one!</p>
      ) : (
        <ul>
          {incidents.map((incident) => (
            <li key={incident.incident_id}>
              <p>
                <strong>Vehicle ID:</strong> {incident.veh_id}
              </p>
              <p>
                <strong>Date:</strong> {incident.incident_date}
              </p>
              <p>
                <strong>Description:</strong> {incident.description}
              </p>
              <button onClick={() => handleEditIncident(incident)}>Edit</button>
              <button onClick={() => handleDeleteIncident(incident.incident_id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <div>
        <h3>{editingIncident ? "Edit Incident" : "Add Incident"}</h3>
        <input
          type="text"
          placeholder="Vehicle ID"
          value={newIncident.vehID}
          onChange={(e) => setNewIncident({ ...newIncident, vehID: e.target.value })}
        />
        <input
          type="date"
          value={newIncident.incidentDate}
          onChange={(e) => setNewIncident({ ...newIncident, incidentDate: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newIncident.description}
          onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
        ></textarea>
        <button onClick={editingIncident ? handleUpdateIncident : handleAddIncident}>
          {editingIncident ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default IncidentReporting;
