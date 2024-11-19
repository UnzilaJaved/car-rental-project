import React, { useState, useEffect } from 'react';
import './maintainance.css';

const MaintenanceAdmin = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMaintenance, setNewMaintenance] = useState({
    vehicleId: '',
    type: '',
    cost: '',
    maintenanceDate: '',
    status: 'Available',
  });

  // Fetch maintenance records
  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const response = await fetch('http://localhost:8000/admin/maintenance'); // Replace with backend URL
        const data = await response.json();
        setMaintenances(data);
      } catch (error) {
        console.error('Error fetching maintenance records:', error);
      }
    };
    fetchMaintenances();
  }, []);

  // Add new maintenance
  const handleAddMaintenance = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/admin/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMaintenance),
      });
      if (response.ok) {
        const addedMaintenance = await response.json();
        setMaintenances([...maintenances, addedMaintenance]);
        setNewMaintenance({
          vehicleId: '',
          type: '',
          cost: '',
          maintenanceDate: '',
          status: 'Available',
        });
      }
    } catch (error) {
      console.error('Error adding maintenance:', error);
    }
  };

  // Update maintenance status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/admin/maintenance/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        const updatedMaintenance = await response.json();
        setMaintenances(
          maintenances.map((maintenance) =>
            maintenance.id === id ? updatedMaintenance : maintenance
          )
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Delete maintenance record
  const handleDeleteMaintenance = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/admin/maintenance/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMaintenances(maintenances.filter((maintenance) => maintenance.id !== id));
      }
    } catch (error) {
      console.error('Error deleting maintenance:', error);
    }
  };

  // Filter maintenance records
  const filteredMaintenances = maintenances.filter((maintenance) => {
    return (
      maintenance.vehicleId?.toLowerCase().includes(searchTerm) ||
      maintenance.type?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="maintenances-page">
      <h2>Maintenance Management</h2>

      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by Vehicle ID or Type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />

      {/* Add Maintenance Form */}
      <form onSubmit={handleAddMaintenance} className="add-maintenance">
        <h3>Add Maintenance</h3>
        <input
          type="text"
          name="vehicleId"
          placeholder="Vehicle ID"
          value={newMaintenance.vehicleId}
          onChange={(e) =>
            setNewMaintenance({ ...newMaintenance, vehicleId: e.target.value })
          }
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={newMaintenance.type}
          onChange={(e) =>
            setNewMaintenance({ ...newMaintenance, type: e.target.value })
          }
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={newMaintenance.cost}
          onChange={(e) =>
            setNewMaintenance({ ...newMaintenance, cost: e.target.value })
          }
        />
        <input
          type="date"
          name="maintenanceDate"
          value={newMaintenance.maintenanceDate}
          onChange={(e) =>
            setNewMaintenance({
              ...newMaintenance,
              maintenanceDate: e.target.value,
            })
          }
        />
        <button type="submit">Add Maintenance</button>
      </form>

      {/* Maintenance Table */}
      <table className="maintenances-table">
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMaintenances.map((maintenance) => (
            <tr key={maintenance.id}>
              <td>{maintenance.vehicleId}</td>
              <td>{maintenance.type}</td>
              <td>{maintenance.cost}</td>
              <td>{maintenance.maintenanceDate}</td>
              <td>{maintenance.status}</td>
              <td>
                <button
                  onClick={() =>
                    handleUpdateStatus(
                      maintenance.id,
                      maintenance.status === 'Available'
                        ? 'Under Maintenance'
                        : 'Available'
                    )
                  }
                  className={
                    maintenance.status === 'Available' ? 'mark-button' : 'complete-button'
                  }
                >
                  {maintenance.status === 'Available' ? 'Start' : 'Complete'}
                </button>
                <button
                  onClick={() => handleDeleteMaintenance(maintenance.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceAdmin;
