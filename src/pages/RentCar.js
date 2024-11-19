import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './RentalCar.css'; // Updated CSS for enhanced design

const RentalCar = () => {
  const location = useLocation();
  const { car } = location.state || {}; // Get car data from navigation state

  const [rentalDate, setRentalDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(car ? car.price : 0);

  // Always call the useEffect hook
  useEffect(() => {
    if (rentalDate && returnDate) {
      const rental = new Date(rentalDate);
      const returning = new Date(returnDate);

      // Calculate difference in time and convert to number of days
      const timeDifference = returning.getTime() - rental.getTime();
      const days = Math.ceil(timeDifference / (1000 * 3600 * 24));

      // Update state
      if (days > 0) {
        setTotalDays(days);
        setTotalPrice(days * car.price); // Calculate total price based on days
      } else {
        setTotalDays(0);
        setTotalPrice(car.price); // Default to one day price
      }
    }
  }, [rentalDate, returnDate, car?.price]); // Use optional chaining to avoid errors if car is undefined

  // Conditionally return content based on car availability
  if (!car) {
    return <p>No car selected</p>;
  }

  return (
    <div className="rental-car-page">
      <div className="car-image-section">
        <img src={car.image} alt={car.model} className="car-large-image" />
      </div>
      <div className="car-details-section">
        <h2>{car.model}</h2>
        <div className="car-rental-form">
          <label htmlFor="rentalDate">Rental date</label>
          <input
            type="date"
            id="rentalDate"
            name="rentalDate"
            value={rentalDate}
            onChange={(e) => setRentalDate(e.target.value)}
          />

          <label htmlFor="returnDate">Return date</label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />

          <div className="car-info">
            <p><strong>Gearbox:</strong> {car.gearbox}</p>
            <p><strong>Fuel type:</strong> {car.fuel}</p>
            <p><strong>Availability:</strong> {car.isAvailable ? 'Yes' : 'No'}</p>
          </div>

          {/* Show total days and total price */}
          <div className="car-price">
            <p>Total Days: {totalDays > 0 ? totalDays : 1} day(s)</p>
            <p>{totalPrice} PKR (Total)</p>
          </div>

          {/* Conditionally show "Rent Now" button if the car is available */}
          {car.isAvailable && (
            <button className="rent-button">Rent Now</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default RentalCar;  /* RentalCar.css */













