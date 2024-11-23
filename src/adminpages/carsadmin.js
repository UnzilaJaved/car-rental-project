import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './carsadmin.css';
import axios from 'axios';

const CarsAdmin = () => {
  const token = localStorage.getItem('token');

  // State management
  const [cars, setCars] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newCar, setNewCar] = useState({
    model: '',
    brand: '',
    year: '',
    reg_number: '',
    status: '',
    daily_rate: '',
    mileage: '',
  });
  const [editingCarId, setEditingCarId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch cars on component mount
  useEffect(() => {
    if (token) {
      fetchCars();
    } else {
      setErrorMessage('No token found. Please log in.');
    }
  }, [token]);

  // API call to fetch cars
  const fetchCars = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/list', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(response.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  // Handle API errors
  const handleApiError = (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong.';
    setErrorMessage(message);
  };

  // Auto-clear success and error messages
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Reset form fields
  const resetFormFields = () => {
    setNewCar({
      model: '',
      brand: '',
      year: '',
      reg_number: '',
      status: '',
      daily_rate: '',
      mileage: '',
    });
  };

  const resetForm = () => {
    resetFormFields();
    setIsFormVisible(false);
    setEditingCarId(null);
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  // Add a new car
  const addCar = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/add-vehicles',
        newCar,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCars([response.data, ...cars]);
        setSuccessMessage('Car added successfully!');
        resetForm();
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // Update an existing car
  const updateCar = async (id) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/vehicles/${id}`,
        newCar,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCars(cars.map((car) => (car.id === id ? response.data : car)));
        setSuccessMessage('Car updated successfully!');
        resetForm();
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // Delete a car
  const deleteCar = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/deleted/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setCars(cars.filter((car) => car.id !== id));
        setSuccessMessage('Car deleted successfully!');
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // Form submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingCarId) {
      updateCar(editingCarId);
    } else {
      addCar();
    }
  };

  const handleAddCar = () => {
    resetFormFields();
    setIsFormVisible(true);
  };

  const handleEditCar = (car) => {
    setNewCar(car);
    setEditingCarId(car.id);
    setIsFormVisible(true);
  };

  // Search functionality
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
  const filteredCars = cars.filter((car) =>
    [car.model, car.brand, car.reg_number]
      .some((field) => field?.toLowerCase().includes(searchTerm))
  );

  // Render component
  if (!token) {
    return <div>Please log in to access the admin panel.</div>;
  }

  return (
    <div className="cars-section">
      <div className="header">
        <button className="add-car-button" onClick={handleAddCar}>+ Add Car</button>
        <input
          type="text"
          placeholder="Search for cars"
          className="search-bar"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {isFormVisible && (
        <form className="car-form" onSubmit={handleFormSubmit}>
          <input type="text" name="model" placeholder="Model" value={newCar.model} onChange={handleInputChange} required />
          <input type="text" name="brand" placeholder="Brand" value={newCar.brand} onChange={handleInputChange} required />
          <input type="number" name="year" placeholder="Year" value={newCar.year} onChange={handleInputChange} required />
          <input type="text" name="reg_number" placeholder="Registration Number" value={newCar.reg_number} onChange={handleInputChange} required />
          <input type="text" name="status" placeholder="Status" value={newCar.status} onChange={handleInputChange} required />
          <input type="number" name="daily_rate" placeholder="Daily Rate" value={newCar.daily_rate} onChange={handleInputChange} required />
          <input type="number" name="mileage" placeholder="Mileage" value={newCar.mileage} onChange={handleInputChange} required />
          <button type="submit">{editingCarId ? 'Update Car' : 'Add Car'}</button>
        </form>
      )}

      <table className="cars-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Brand</th>
            <th>Year</th>
            <th>Registration Number</th>
            <th>Status</th>
            <th>Daily Rate</th>
            <th>Mileage</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {filteredCars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.model}</td>
              <td>{car.brand}</td>
              <td>{car.year}</td>
              <td>{car.reg_number}</td>
              <td>{car.status}</td>
              <td>{car.daily_rate}</td>
              <td>{car.mileage}</td>
              <td>
                <button className="edit-button" title="Edit Car" onClick={() => handleEditCar(car)}>
                  <FaEdit />
                </button>
                <button className="delete-button" title="Delete Car" onClick={() => deleteCar(car.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarsAdmin;
