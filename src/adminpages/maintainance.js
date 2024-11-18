import React, { useState, useEffect } from 'react';
import './maintainance.css';

const MaintainanceAdmin = () => {
    // Initialize maintenance records
    const [maintenances, setMaintenances] = useState(() => {
        const savedMaintenances = localStorage.getItem('maintenances');
        return savedMaintenances ? JSON.parse(savedMaintenances) : [
            { id: 1, vehicleId: 'V1001', type: 'Oil Change', cost: 150, maintenance: '2023-06-26', status: 'Available' },
            { id: 2, vehicleId: 'V1002', type: 'Brake Repair', cost: 300, maintenance: '2023-07-01', status: 'Under Maintenance' },
            { id: 3, vehicleId: 'V1003', type: 'Tire Replacement', cost: 400, maintenance: '2023-07-26', status: 'Available' }
        ];
    });

    const [searchTerm, setSearchTerm] = useState('');

    // Update localStorage whenever the maintenance list changes
    useEffect(() => {
        localStorage.setItem('maintenances', JSON.stringify(maintenances));
    }, [maintenances]);

    // Handle search term change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Handle car return
    const handleCarReturn = (id) => {
        setMaintenances(maintenances.map(car =>
            car.id === id ? { ...car, status: 'Under Maintenance' } : car
        ));
    };

    // Handle marking maintenance as complete
    const handleMaintenanceComplete = (id) => {
        setMaintenances(maintenances.map(car =>
            car.id === id ? { ...car, status: 'Available' } : car
        ));
    };

    // Filter maintenance records based on search term
    const filteredMaintenances = maintenances.filter(maintenance => {
        const vehicleId = maintenance.vehicleId || '';  // Default to an empty string if undefined
        const type = maintenance.type || '';            // Default to an empty string if undefined

        return vehicleId.toLowerCase().includes(searchTerm) || type.toLowerCase().includes(searchTerm);
    });

    return (
        <div className="maintenances-page">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for maintenance records"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <table className="maintenances-table">
                <thead>
                    <tr>
                        <th>Vehicle ID</th>
                        <th>Type</th>
                        <th>Cost</th>
                        <th>Maintenance Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMaintenances.length > 0 ? (
                        filteredMaintenances.map((car) => (
                            <tr key={car.id}>
                                <td>{car.vehicleId}</td>
                                <td>{car.type}</td>
                                <td>{car.cost} MAD</td>
                                <td>{car.maintenance}</td>
                                <td>{car.status}</td>
                                <td>
                                    {car.status === 'Available' ? (
                                        <button onClick={() => handleCarReturn(car.id)} className="return-button">
                                            Mark as Returned
                                        </button>
                                    ) : (
                                        <button onClick={() => handleMaintenanceComplete(car.id)} className="complete-button">
                                            Complete Maintenance
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No maintenance records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MaintainanceAdmin;
