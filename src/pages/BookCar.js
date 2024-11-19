// BookCars.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookCar.css'; // Import the CSS file

// CarCard Component for each car card
const CarCard = ({ model, price, year, image, onRent, isAvailable }) => {
  return (
    <div className="car-card">
      <img src={image} alt={model} className="car-image" />
      <h3>{model}</h3>
      <p>{year}</p>
      <p>{price} PKR/day</p>
      <button className="rent-button" onClick={onRent} disabled={!isAvailable}>
        {isAvailable ? 'Rent now' : 'Not Available'}
      </button>
    </div>
  );
};

// Main BookCars Component that lists all cars
const BookCars = () => {
  const navigate = useNavigate(); // React Router hook to navigate to a different page
  const [cars, setCars] = useState([]); // State for car data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(''); // State for error handling

  // Check if user is logged in by verifying the auth token
  const isLoggedIn = localStorage.getItem('authToken');

  // If not logged in, redirect to login page
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
    }
  }, [isLoggedIn, navigate]);

  // Fetch car data from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/list'); // Call backend to fetch cars
        setCars(response.data); // Set the fetched cars into state
        setLoading(false); // Set loading to false after fetching data
      } catch (err) {
        setError('Error fetching car data');
        setLoading(false);
      }
    };
    fetchCars();
  }, []); // Empty dependency array to fetch cars only once when the component mounts

  // Function to handle when a user clicks "Rent now"
  const handleRentClick = (car) => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }

    // Send rental data to backend when user rents a car
    const rentCar = async () => {
      try {
        await axios.post('/api/add-vehicles', {
          model: car.model,
          price: car.price,
          year: car.year,
          gearbox: car.gearbox,
          fuel: car.fuel,
          isAvailable: false, // Update availability status when rented
        });
        navigate('/rental-car', { state: { car } }); // Navigate to rental page with car details
      } catch (error) {
        setError('Error renting the car');
      }
    };

    rentCar();
  };

  if (loading) {
    return <div>Loading cars...</div>; // Show loading message while fetching cars
  }

  if (error) {
    return <div>{error}</div>; // Show error if any
  }

  return (
    <div className="book-cars">
      <h1>Book Cars</h1>
      <div className="car-grid">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            model={car.model}
            year={car.year}
            price={car.price}
            image={car.image}
            onRent={() => handleRentClick(car)} // Pass car data when clicking the button
            isAvailable={car.isAvailable} // Check availability before enabling the rent button
          />
        ))}
      </div>
    </div>
  );
};

export default BookCars;
