import React, { useState } from 'react';
import './Incident.css';

const IncidentForm = () => {
    const [formData, setFormData] = useState({
        incidentID: '',        // New field
        vehicleID: '',         // New field
        bookingID: '',         // New field
        incidentDate: '',      // Updated field
        description: '',       // Updated field
        damageCost: '',        // New field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Incident Report:', formData);
    };

    return (
        <div className="incident-form">
            <h2>Incident Reporting Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Incident ID (PK):
                    <input
                        type="text"
                        name="incidentID"
                        value={formData.incidentID}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Vehicle ID (FK):
                    <input
                        type="text"
                        name="vehicleID"
                        value={formData.vehicleID}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Booking ID (FK):
                    <input
                        type="text"
                        name="bookingID"
                        value={formData.bookingID}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Incident Date:
                    <input
                        type="date"
                        name="incidentDate"
                        value={formData.incidentDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Damage Cost:
                    <input
                        type="number"
                        name="damageCost"
                        value={formData.damageCost}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit">Submit Report</button>
            </form>
        </div>
    );
};

export default IncidentForm;
