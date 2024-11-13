// BookCars.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookCar.css'; // Import the CSS file

// CarCard Component for each car card
const CarCard = ({ model, price, year, image, onRent }) => {
  return (
    <div className="car-card">
      <img src={image} alt={model} className="car-image" />
      <h3>{model}</h3>
      <p>{year}</p>
      <p>{price} PKR/day</p>
      <button className="rent-button" onClick={onRent}>Rent now</button>
    </div>
  );
};

// Main BookCars Component that lists all cars
const BookCars = () => {
  const navigate = useNavigate(); // React Router hook to navigate to a different page

  // Sample car data
  const cars = [
    {
      model: 'Suzuki Alto',
      year: 2021,
      price: 1500,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'manual',
      fuel: 'gas',
      isAvailable: true,
    },
    {
      model: 'Toyota Corolla',
      year: 2020,
      price: 3000,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'automatic',
      fuel: 'diesel',
      isAvailable: false,
    },
    {
      model: 'Honda Civic',
      year: 2022,
      price: 4500,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'automatic',
      fuel: 'petrol',
      isAvailable: true,
    },
    {
      model: 'Suzuki Cultus',
      year: 2019,
      price: 2000,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'manual',
      fuel: 'petrol',
      isAvailable: true,
    },
    {
      model: 'Honda City',
      year: 2021,
      price: 3500,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'manual',
      fuel: 'petrol',
      isAvailable: true,
    },
    {
      model: 'Kia Sportage',
      year: 2023,
      price: 6000,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'automatic',
      fuel: 'petrol',
      isAvailable: true,
    },
    {
      model: 'Hyundai Tucson',
      year: 2022,
      price: 5500,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'automatic',
      fuel: 'diesel',
      isAvailable: false,
    },
    {
      model: 'Suzuki Wagon R',
      year: 2020,
      price: 1800,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'manual',
      fuel: 'petrol',
      isAvailable: true,
    },
    {
      model: 'Toyota Yaris',
      year: 2022,
      price: 3200,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'automatic',
      fuel: 'petrol',
      isAvailable: true,
    },
    {
      model: 'Suzuki Swift',
      year: 2021,
      price: 3000,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'manual',
      fuel: 'petrol',
      isAvailable: true,
    },
    {
      model: 'Changan Alsvin',
      year: 2022,
      price: 3400,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'automatic',
      fuel: 'petrol',
      isAvailable: true,
    },
    {
      model: 'DFSK Glory 580',
      year: 2023,
      price: 4200,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'automatic',
      fuel: 'petrol',
      isAvailable: false,
    },
    {
      model: 'Proton Saga',
      year: 2021,
      price: 2800,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'manual',
      fuel: 'petrol',
      isAvailable: true,
    },
    {
      model: 'MG ZS',
      year: 2023,
      price: 4800,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'automatic',
      fuel: 'petrol',
      isAvailable: true,
    },
    {
      model: 'Suzuki Bolan',
      year: 2018,
      price: 1200,
      image: '/IMAGES/carhome.jpg',
      gearbox: 'manual',
      fuel: 'gas',
      isAvailable: true,
    }
  ];
  

  // Function to handle when a user clicks "Rent now"
  const handleRentClick = (car) => {
    navigate('/rental-car', { state: { car } }); // Navigate to RentalCar page with the car data
  };

  return (
    <div className="book-cars">
      <h1>Book Cars</h1>
      <div className="car-grid">
        {cars.map((car, index) => (
          <CarCard
            key={index}
            model={car.model}
            year={car.year}
            price={car.price}
            image={car.image}
            onRent={() => handleRentClick(car)} // Pass car data when clicking the button
          />
        ))}
      </div>
    </div>
  );
};

export default BookCars;
