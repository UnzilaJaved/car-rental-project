import React, { useState, useEffect } from 'react';
import './maintainance.css';

const MaintainanceAdmin = () => {
    // Initialize maintenance records
    const [maintenances, setMaintenances] = useState(() => {
        const savedMaintenances = localStorage.getItem('maintenances');
        return savedMaintenances ? JSON.parse(savedMaintenances) : [
            { id: 1, photo: 'golf-6.jpg', model: 'Golf-6', type: 'Oil Change', cost: 150, mechanicName: 'Monir', telephone: '0695051534', lastMaintenance: '2023-05-26', nextMaintenance: '2023-06-26', status: 'Available' },
            { id: 2, photo: 'toyota.jpg', model: 'Toyota', type: 'Brake Repair', cost: 300, mechanicName: 'Ahmed', telephone: '0695051535', lastMaintenance: '2023-06-01', nextMaintenance: '2023-07-01', status: 'Under Maintenance' },
            { id: 3, photo: 'clio.jpg', model: 'Clio', type: 'Tire Replacement', cost: 400, mechanicName: 'Abdelaziz', telephone: '0695051538', lastMaintenance: '2023-05-26', nextMaintenance: '2023-07-26', status: 'Available' }
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
    const filteredMaintenances = maintenances.filter(maintenance =>
        maintenance.model.toLowerCase().includes(searchTerm) ||
        maintenance.mechanicName.toLowerCase().includes(searchTerm) ||
        maintenance.telephone.includes(searchTerm)
    );

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
                        <th>Photo</th>
                        <th>Model</th>
                        <th>Type</th>
                        <th>Cost</th>
                        <th>Mechanic Name</th>
                        <th>Telephone</th>
                        <th>Last Maintenance</th>
                        <th>Next Maintenance</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMaintenances.length > 0 ? (
                        filteredMaintenances.map((car) => (
                            <tr key={car.id}>
                                <td><img src={`/images/${car.photo}`} alt={car.model} width="50" /></td>
                                <td>{car.model}</td>
                                <td>{car.type}</td>
                                <td>{car.cost} MAD</td>
                                <td>{car.mechanicName}</td>
                                <td>{car.telephone}</td>
                                <td>{car.lastMaintenance}</td>
                                <td>{car.nextMaintenance}</td>
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
                            <td colSpan="10">No maintenance records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MaintainanceAdmin;
