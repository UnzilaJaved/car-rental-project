import React, { useState } from 'react';
import './Insurance.css';
import axios from 'axios';
const InsuranceForm = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        insuranceID: '',        // Insurance ID (PK)
        vehicleID: '',          // Vehicle ID (FK)
        policyNumber: '',       // Policy Number
        coverageDetails: '',    // Coverage Details
        expiryDate: '',         // Expiry Date
    });

    // State to manage submission state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State to manage error messages
    const [error, setError] = useState('');

    // Handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Start submission
        setError('');          // Reset errors

        try {
            console.log('Insurance Report Submitted:', formData);

            //Example: Submit data to a backend API
            //Uncomment the following block when using a backend API
            const response = await axios.post('http://localhost:5000/insurance', formData);
            console.log('Server Response:', response.data);

            //Reset form data upon successful submission
            setFormData({
                insuranceID: '',
                vehicleID: '',
                policyNumber: '',
                coverageDetails: '',
                expiryDate: '',
            });
        } catch (err) {
            console.error('Submission Error:', err);
            setError('Failed to submit the insurance report. Please try again.');
        } finally {
            setIsSubmitting(false); // End submission
        }
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

                {/* Display error message */}
                {error && <p className="error-message">{error}</p>}

                {/* Submit button with loading indicator */}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Insurance'}
                </button>
            </form>
        </div>
    );
};

export default InsuranceForm;
