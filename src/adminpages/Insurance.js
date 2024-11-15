import React, { useState } from 'react';
import './Insurance.css';

const InsuranceForm = () => {
    const [formData, setFormData] = useState({
        insuranceID: '',        // Insurance ID (PK)
        vehicleID: '',          // Vehicle ID (FK)
        policyNumber: '',       // Policy Number
        coverageDetails: '',    // Coverage Details
        expiryDate: '',         // Expiry Date
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
        console.log('Insurance Report:', formData);
    };

    return (
        <div className="insurance-form">
            <h2>Insurance Reporting Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Insurance ID (PK):
                    <input
                        type="text"
                        name="insuranceID"
                        value={formData.insuranceID}
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
                    Policy Number:
                    <input
                        type="text"
                        name="policyNumber"
                        value={formData.policyNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Coverage Details:
                    <textarea
                        name="coverageDetails"
                        value={formData.coverageDetails}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Expiry Date:
                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit">Submit Insurance</button>
            </form>
        </div>
    );
};

export default InsuranceForm;
