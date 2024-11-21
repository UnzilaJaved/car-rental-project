import React, { useState, useEffect } from 'react';
import './Insurance.css';

const InsuranceAdmin = () => {
  const [insurances, setInsurances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newInsurance, setNewInsurance] = useState({
    veh_id: '',
    insurance_company: '',
    policy_number: '',
    start_date: '',
    end_date: '',
    coverage_details: '',
  });

  // Fetch insurance records
  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/admin/insurances');
        const data = await response.json();
        setInsurances(data);
      } catch (error) {
        console.error('Error fetching insurance records:', error);
      }
    };
    fetchInsurances();
  }, []);

  // Add new insurance
  const handleAddInsurance = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/admin/insurances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInsurance),
      });
      if (response.ok) {
        const addedInsurance = await response.json();
        setInsurances([...insurances, addedInsurance]);
        setNewInsurance({
          veh_id: '',
          insurance_company: '',
          policy_number: '',
          start_date: '',
          end_date: '',
          coverage_details: '',
        });
      }
    } catch (error) {
      console.error('Error adding insurance:', error);
    }
  };

  // Update insurance record
  const handleUpdateInsurance = async (id, updatedData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/insurances/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedInsurance = await response.json();
        setInsurances(
          insurances.map((insurance) =>
            insurance.id === id ? updatedInsurance : insurance
          )
        );
      }
    } catch (error) {
      console.error('Error updating insurance record:', error);
    }
  };

  // Delete insurance record
  const handleDeleteInsurance = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/insurances/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setInsurances(insurances.filter((insurance) => insurance.id !== id));
      }
    } catch (error) {
      console.error('Error deleting insurance record:', error);
    }
  };

  // Filter insurance records based on search term
  const filteredInsurances = insurances.filter((insurance) => {
    return (
      insurance.veh_id.toString().includes(searchTerm) ||
      insurance.policy_number.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="insurance-page">
      <h2>Insurance Management</h2>

      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by Vehicle ID or Policy Number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />

      {/* Add Insurance Form */}
      <form onSubmit={handleAddInsurance} className="add-insurance">
        <h3>Add Insurance</h3>
        <input
          type="number"
          placeholder="Vehicle ID"
          value={newInsurance.veh_id}
          onChange={(e) =>
            setNewInsurance({ ...newInsurance, veh_id: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Insurance Company"
          value={newInsurance.insurance_company}
          onChange={(e) =>
            setNewInsurance({ ...newInsurance, insurance_company: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Policy Number"
          value={newInsurance.policy_number}
          onChange={(e) =>
            setNewInsurance({ ...newInsurance, policy_number: e.target.value })
          }
        />
        <input
          type="date"
          value={newInsurance.start_date}
          onChange={(e) =>
            setNewInsurance({ ...newInsurance, start_date: e.target.value })
          }
        />
        <input
          type="date"
          value={newInsurance.end_date}
          onChange={(e) =>
            setNewInsurance({ ...newInsurance, end_date: e.target.value })
          }
        />
        <textarea
          placeholder="Coverage Details"
          value={newInsurance.coverage_details}
          onChange={(e) =>
            setNewInsurance({ ...newInsurance, coverage_details: e.target.value })
          }
        />
        <button type="submit">Add Insurance</button>
      </form>

      {/* Insurance Table */}
      <table className="insurance-table">
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Insurance Company</th>
            <th>Policy Number</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Coverage Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInsurances.map((insurance) => (
            <tr key={insurance.id}>
              <td>{insurance.veh_id}</td>
              <td>{insurance.insurance_company}</td>
              <td>{insurance.policy_number}</td>
              <td>{insurance.start_date}</td>
              <td>{insurance.end_date}</td>
              <td>{insurance.coverage_details}</td>
              <td>
                {/* Update and Delete Buttons */}
                <button
                  onClick={() =>
                    handleUpdateInsurance(insurance.id, {
                      ...insurance,
                      status: insurance.status === 'ACTIVE' ? 'EXPIRED' : 'ACTIVE',
                    })
                  }
                >
                  Toggle Status
                </button>
                <button onClick={() => handleDeleteInsurance(insurance.id)}>
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

export default InsuranceAdmin;
