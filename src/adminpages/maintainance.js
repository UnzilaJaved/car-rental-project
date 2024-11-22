import React, { useState, useEffect } from 'react';
import './maintainance.css';

const MaintenanceAdmin = () => {
  const token = localStorage.getItem("token");
  const [maintenances, setMaintenances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMaintenance, setNewMaintenance] = useState({
    veh_id: '',
    maintenance_date: '',
    description: '',
    cost: '',
    status: 'MAINTENANCE DONE',
  });

  // Fetch maintenance records
  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/admin/maintenance');
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
      const response = await fetch('http://127.0.0.1:8000/admin/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMaintenance),
      },{headers:{Authorization:`Bearer ${token}`}});
      if (response.ok) {
        const addedMaintenance = await response.json();
        setMaintenances([...maintenances, addedMaintenance]);
        setNewMaintenance({
          veh_id: '',
          maintenance_date: '',
          description: '',
          cost: '',
          status: 'MAINTENANCE DONE',
        });
      }
    } catch (error) {
      console.error('Error adding maintenance:', error);
    }
  };

  // Update maintenance status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/maintenance/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      },{headers:{Authorization:`Bearer ${token}`}});
      if (response.ok) {
        const updatedMaintenance = await response.json();
        setMaintenances(
          maintenances.map((maintenance) =>
            maintenance.main_id === id ? updatedMaintenance : maintenance
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
      const response = await fetch(`http://127.0.0.1:8000/admin/maintenance/${id}`, {
        method: 'DELETE',
      },{headers:{Authorization:`Bearer ${token}`}});
      if (response.ok) {
        setMaintenances(maintenances.filter((maintenance) => maintenance.main_id !== id));
      }
    } catch (error) {
      console.error('Error deleting maintenance:', error);
    }
  };

  // Filter maintenance records
  const filteredMaintenances = maintenances.filter((maintenance) => {
    return (
      maintenance.veh_id.toString().includes(searchTerm) ||
      maintenance.description.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="maintenances-page">
      <h2>Maintenance Management</h2>

      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by Vehicle ID or Description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />

      {/* Add Maintenance Form */}
      <form onSubmit={handleAddMaintenance} className="add-maintenance">
        <h3>Add Maintenance</h3>
        <input
          type="number"
          placeholder="Vehicle ID"
          value={newMaintenance.veh_id}
          onChange={(e) =>
            setNewMaintenance({ ...newMaintenance, veh_id: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newMaintenance.description}
          onChange={(e) =>
            setNewMaintenance({ ...newMaintenance, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Cost"
          value={newMaintenance.cost}
          onChange={(e) =>
            setNewMaintenance({ ...newMaintenance, cost: e.target.value })
          }
        />
        <input
          type="date"
          value={newMaintenance.maintenance_date}
          onChange={(e) =>
            setNewMaintenance({ ...newMaintenance, maintenance_date: e.target.value })
          }
        />
        <button type="submit">Add Maintenance</button>
      </form>

      {/* Maintenance Table */}
      <table className="maintenances-table">
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMaintenances.map((maintenance) => (
            <tr key={maintenance.main_id}>
              <td>{maintenance.veh_id}</td>
              <td>{maintenance.description}</td>
              <td>{maintenance.cost}</td>
              <td>{maintenance.maintenance_date}</td>
              <td>{maintenance.status}</td>
              <td>
                <button
                  onClick={() =>
                    handleUpdateStatus(
                      maintenance.main_id,
                      maintenance.status === 'MAINTENANCE DONE'
                        ? 'UNDER MAINTENANCE'
                        : 'MAINTENANCE DONE'
                    )
                  }
                  className={maintenance.status === 'MAINTENANCE DONE' ? 'under-maintenance' : 'done'}
                >
                  Toggle Status
                </button>
                <button onClick={() => handleDeleteMaintenance(maintenance.main_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceAdmin;
