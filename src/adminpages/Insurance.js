import React, { useState, useEffect } from 'react'; 
import './Insurance.css';

const InsuranceAdmin = () => {
  const token = localStorage.getItem("token");
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
  const [editInsurance, setEditInsurance] = useState(null);  // To store insurance that is being edited

  // Fetch insurance records (List Function)
  const fetchInsurances = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/insurances', {
        headers: {
          'Authorization': `Bearer ${token}` // Add Bearer token to the request headers
        }
      });
      const data = await response.json();
      setInsurances(data);
    } catch (error) {
      console.error('Error fetching insurance records:', error);
    }
  };

  // Add new insurance (Add Function)
  const handleAddInsurance = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/insurances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add Bearer token to the request headers
        },
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
        fetchInsurances();  // Refetch after adding
      }
    } catch (error) {
      console.error('Error adding insurance:', error);
    }
  };

  // Update insurance record (Update Function)
  const handleUpdateInsurance = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/insurances/${editInsurance.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add Bearer token to the request headers
        },
        body: JSON.stringify(editInsurance),
      });
      if (response.ok) {
        const updatedInsurance = await response.json();
        setInsurances(
          insurances.map((insurance) =>
            insurance.id === editInsurance.id ? updatedInsurance : insurance
          )
        );
        setEditInsurance(null);  // Close the edit form
      }
    } catch (error) {
      console.error('Error updating insurance record:', error);
    }
  };

  // Delete insurance record (Delete Function)
  const handleDeleteInsurance = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/insurances/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Add Bearer token to the request headers
        }
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
      (insurance.veh_id && insurance.veh_id.toString().includes(searchTerm)) ||  // Check for undefined
      (insurance.policy_number && insurance.policy_number.toLowerCase().includes(searchTerm)) // Check for undefined
    );
  });

  // Initialize when component mounts
  useEffect(() => {
    fetchInsurances();  // Fetch insurances when the component mounts
  }, [token]);  // Token as a dependency to refetch if token changes

  // Set the form with data to be updated
  const handleEditInsurance = (insurance) => {
    setEditInsurance(insurance);
  };

  // Handle form changes for update
  const handleChange = (e) => {
    setEditInsurance({
      ...editInsurance,
      [e.target.name]: e.target.value
    });
  };

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

      {/* Update Insurance Form (if editing) */}
      {editInsurance && (
        <form onSubmit={handleUpdateInsurance} className="update-insurance">
          <h3>Update Insurance</h3>
          <input
            type="number"
            name="veh_id"
            placeholder="Vehicle ID"
            value={editInsurance.veh_id}
            onChange={handleChange}
          />
          <input
            type="text"
            name="insurance_company"
            placeholder="Insurance Company"
            value={editInsurance.insurance_company}
            onChange={handleChange}
          />
          <input
            type="text"
            name="policy_number"
            placeholder="Policy Number"
            value={editInsurance.policy_number}
            onChange={handleChange}
          />
          <input
            type="date"
            name="start_date"
            value={editInsurance.start_date}
            onChange={handleChange}
          />
          <input
            type="date"
            name="end_date"
            value={editInsurance.end_date}
            onChange={handleChange}
          />
          <textarea
            name="coverage_details"
            placeholder="Coverage Details"
            value={editInsurance.coverage_details}
            onChange={handleChange}
          />
          <button type="submit">Update Insurance</button>
        </form>
      )}

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
                {/* Edit and Delete Buttons */}
                <button onClick={() => handleEditInsurance(insurance)}>
                  Edit
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
