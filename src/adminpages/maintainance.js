import React, { useState, useEffect } from 'react';

// MaintenanceAdmin component to handle maintenance records
const MaintenanceAdmin = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [editMaintenance, setEditMaintenance] = useState(null);
  const [formData, setFormData] = useState({
    veh_id: '',
    maintenance_date: '',
    description: '',
    cost: '',
    status: 'pending',
  });

  // Replace with actual token retrieval method (localStorage, cookies, etc.)
  const getAuthToken = () => {
    return localStorage.getItem('token'); // Assuming the token is stored in localStorage
  };

  // Fetch maintenance records from the backend
  const fetchMaintenances = async () => {
    try {
      const token = getAuthToken(); // Get token from storage or context
      const response = await fetch('http://localhost:8000/api/admin/maintenance', {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to the request headers
        },
      });
      const data = await response.json();

      if (data.maintenanceRecords && Array.isArray(data.maintenanceRecords)) {
        setMaintenances(data.maintenanceRecords);
      } else {
        console.error('Unexpected data structure:', data);
      }
    } catch (error) {
      console.error('Error fetching maintenance records:', error);
    }
  };

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for creating or updating a maintenance record
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editMaintenance ? 'PUT' : 'POST';
      const url = editMaintenance
        ? `http://localhost:8000/api/admin/maintenance/${editMaintenance.main_id}` // Update URL with main_id for editing
        : 'http://localhost:8000/api/admin/maintenance'; // Add new record

      const token = getAuthToken(); // Get token for authorization

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add Bearer token to the request headers
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        alert('Maintenance record saved successfully');
        fetchMaintenances(); // Re-fetch maintenance records after saving
        setFormData({
          veh_id: '',
          maintenance_date: '',
          description: '',
          cost: '',
          status: 'pending',
        });
        setEditMaintenance(null);
      } else {
        alert(result.message || 'An error occurred while saving the record');
      }
    } catch (error) {
      console.error('Error saving maintenance record:', error);
      alert('An error occurred while saving the record');
    }
  };

  // Handle editing a maintenance record
  const handleEdit = (maintenance) => {
    setEditMaintenance(maintenance);
    setFormData({
      veh_id: maintenance.veh_id,
      maintenance_date: maintenance.maintenance_date,
      description: maintenance.description,
      cost: maintenance.cost,
      status: maintenance.status,
    });
  };

  // Handle deleting a maintenance record
  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this maintenance record?');
    if (confirmation) {
      try {
        const token = getAuthToken(); // Get token for authorization
        const response = await fetch(`http://localhost:8000/api/admin/maintenance/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, // Add Bearer token to the request headers
          },
        });
        const result = await response.json();

        if (response.ok) {
          alert('Maintenance record deleted successfully');
          fetchMaintenances(); // Re-fetch maintenance records after deletion
        } else {
          alert(result.message || 'An error occurred while deleting the record');
        }
      } catch (error) {
        console.error('Error deleting maintenance record:', error);
        alert('An error occurred while deleting the record');
      }
    }
  };

  // Fetch the maintenance records when the component mounts
  useEffect(() => {
    fetchMaintenances();
  }, []);

  return (
    <div>
      <h1>Maintenance Records</h1>

      {/* Maintenance Form */}
      <h2>{editMaintenance ? 'Edit Maintenance' : 'Add New Maintenance'}</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Vehicle ID:</label>
          <input
            type="text"
            name="veh_id"
            value={formData.veh_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Maintenance Date:</label>
          <input
            type="date"
            name="maintenance_date"
            value={formData.maintenance_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Cost:</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">
          {editMaintenance ? 'Update Maintenance' : 'Add Maintenance'}
        </button>
      </form>

      {/* Maintenance Records Table */}
      <h2>All Maintenance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Vehicle Model</th>
            <th>Brand</th>
            <th>Year</th>
            <th>Registration Number</th>
            <th>Maintenance Date</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {maintenances.length > 0 ? (
            maintenances.map((maintenance) => (
              <tr key={maintenance.main_id}>
                <td>{maintenance.model}</td>
                <td>{maintenance.brand}</td>
                <td>{maintenance.year}</td>
                <td>{maintenance.reg_number}</td>
                <td>{maintenance.maintenance_date}</td>
                <td>{maintenance.description}</td>
                <td>{maintenance.cost}</td>
                <td>{maintenance.status}</td>
                <td>
                  <button onClick={() => handleEdit(maintenance)}>Edit</button>
                  <button onClick={() => handleDelete(maintenance.main_id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No maintenance records available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceAdmin;
