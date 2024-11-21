import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './carsadmin.css';

const CarsAdmin = () => {
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

  // Fetch cars from the backend on component mount
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/list')
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching cars:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleAddCar = () => {
    setIsFormVisible(true);
    setEditingCarId(null);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const url = editingCarId
      ? `http://127.0.0.1:8000/api/update-vehicles/${editingCarId}`
      : 'http://127.0.0.1:8000/api/add-vehicles';
    const method = editingCarId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
      });

      if (response.ok) {
        const result = await response.json();

        if (editingCarId) {
          // Update car in the frontend
          setCars(cars.map((car) => (car.id === editingCarId ? result : car)));
        } else {
          // Add the new car to the frontend immediately
          setCars([result, ...cars]);
          setSuccessMessage('Car added successfully!');
        }

        // Hide the form and reset the fields for the next car addition
        setIsFormVisible(false);
        setNewCar({
          model: '',
          brand: '',
          year: '',
          reg_number: '',
          status: '',
          daily_rate: '',
          mileage: '',
        });
        setEditingCarId(null);

        // Clear the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        console.error('Failed to save car');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/deleted/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Filter out the deleted car from the cars list
        setCars(cars.filter((car) => car.id !== id));
      } else {
        console.error('Failed to delete car');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleEditCar = (car) => {
    setIsFormVisible(true);
    setEditingCarId(car.id);
    setNewCar(car);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter cars based on search term and ensure we don't call toLowerCase on undefined values
  const filteredCars = cars.filter((car) => {
    const modelMatch = car.model ? car.model.toLowerCase().includes(searchTerm) : false;
    const brandMatch = car.brand ? car.brand.toLowerCase().includes(searchTerm) : false;
    const regNumberMatch = car.reg_number ? car.reg_number.toLowerCase().includes(searchTerm) : false;

    return modelMatch || brandMatch || regNumberMatch;
  });

  return (
    <div className="cars-section">
      <div className="header">
        <button className="add-car-button" onClick={handleAddCar}>
          + Add car
        </button>
        <input
          type="text"
          placeholder="Search for cars"
          className="search-bar"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Success Message */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {isFormVisible && (
        <form className="car-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={newCar.model}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={newCar.brand}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={newCar.year}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="reg_number"
            placeholder="Registration Number"
            value={newCar.reg_number}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={newCar.status}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="daily_rate"
            placeholder="Daily Rate"
            value={newCar.daily_rate}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="mileage"
            placeholder="Mileage"
            value={newCar.mileage}
            onChange={handleInputChange}
            required
          />
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
                <button className="edit-button" onClick={() => handleEditCar(car)}>
                  <FaEdit />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteCar(car.id)}
                >
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
