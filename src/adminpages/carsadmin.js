import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './carsadmin.css';
const CarsAdmin = () => {
  const [cars, setCars] = useState(() => {
    const savedCars = localStorage.getItem('cars');
    return savedCars ? JSON.parse(savedCars) : [
      { id: 11, photo: 'golf-6.jpg', brand: 'golf-6', model: '2010', gearbox: 'automatic', type: 'diesel', price: '550 MAD', availability: false },
      { id: 12, photo: 'mercedes.jpg', brand: 'mercedes', model: '2016', gearbox: 'manual', type: 'gas', price: '600 MAD', availability: false },
      { id: 13, photo: 'dacia.jpg', brand: 'dacia', model: '2018', gearbox: 'automatic', type: 'gas', price: '300 MAD', availability: false },
      { id: 14, photo: 'toyota.jpg', brand: 'toyota', model: '2018', gearbox: 'automatic', type: 'gas', price: '600 MAD', availability: false }
    ];
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newCar, setNewCar] = useState({
    id: '', photo: '', brand: '', model: '', gearbox: '', type: '', price: '', availability: false
  });
  const [editingCarId, setEditingCarId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleAddCar = () => {
    setIsFormVisible(true);
    setEditingCarId(null);
    setNewCar({ id: '', photo: '', brand: '', model: '', gearbox: '', type: '', price: '', availability: false });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingCarId) {
      setCars(cars.map(car => car.id === editingCarId ? { ...car, ...newCar } : car));
    } else {
      setCars([...cars, { ...newCar, id: cars.length + 11 }]);
    }
    setIsFormVisible(false);
    setNewCar({ id: '', photo: '', brand: '', model: '', gearbox: '', type: '', price: '', availability: false });
    setEditingCarId(null);
  };

  const handleDeleteCar = () => {
    setCars(cars.filter(car => car.id !== carToDelete));
    setShowDeleteModal(false);
    setCarToDelete(null);
  };

  const handleDeleteClick = (id) => {
    setShowDeleteModal(true);
    setCarToDelete(id);
  };

  const handleEditCar = (car) => {
    setIsFormVisible(true);
    setEditingCarId(car.id);
    setNewCar(car);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCars = cars.filter(car =>
    car.brand.toLowerCase().includes(searchTerm) ||
    car.model.toLowerCase().includes(searchTerm) ||
    car.gearbox.toLowerCase().includes(searchTerm) ||
    car.type.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="cars-section">
      <div className="header">
        <button className="add-car-button" onClick={handleAddCar}>+ Add car</button>
        <input
          type="text"
          placeholder="Search for cars"
          className="search-bar"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {isFormVisible && (
        <form className="car-form" onSubmit={handleFormSubmit}>
          <input type="text" name="photo" placeholder="Photo Path" value={newCar.photo} onChange={handleInputChange} required />
          <input type="text" name="brand" placeholder="Brand" value={newCar.brand} onChange={handleInputChange} required />
          <input type="text" name="model" placeholder="Model" value={newCar.model} onChange={handleInputChange} required />
          <input type="text" name="gearbox" placeholder="Gearbox" value={newCar.gearbox} onChange={handleInputChange} required />
          <input type="text" name="type" placeholder="Type" value={newCar.type} onChange={handleInputChange} required />
          <input type="text" name="price" placeholder="Price" value={newCar.price} onChange={handleInputChange} required />
          <button type="submit">{editingCarId ? "Update Car" : "Add Car"}</button>
        </form>
      )}

      <table className="cars-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Gearbox</th>
            <th>Type</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {filteredCars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td><img src={`/images/${car.photo}`} alt={car.brand} className="car-photo" /></td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.gearbox}</td>
              <td>{car.type}</td>
              <td>{car.price}</td>
              <td>{car.availability ? 'Available' : 'Unavailable'}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditCar(car)}><FaEdit /></button>
                <button className="delete-button" onClick={() => handleDeleteClick(car.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="delete-modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this car?</p>
            <button className="confirm-button" onClick={handleDeleteCar}>Yes</button>
            <button className="cancel-button" onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsAdmin;
