import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests
import './RentalCar.css'; // Updated CSS for enhanced design

const RentalCar = () => {
  const location = useLocation();
  const { car } = location.state || {}; // Get car data from navigation state

  const [rentalDate, setRentalDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(car ? car.price : 0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  // Function to handle renting a car
  const handleRentNow = async () => {
    if (!rentalDate || !returnDate) {
      setErrorMessage("Please select both rental and return dates.");
      return;
    }

    const rentalData = {
      car_id: car.id, // Assuming car object contains an id field
      rental_date: rentalDate,
      return_date: returnDate,
      total_price: totalPrice,
    };

    try {
      const response = await axios.post('http://backend.test/api/rent-car', rentalData);

      if (response.status === 200) {
        setSuccessMessage("Car rental request submitted successfully!");
        setErrorMessage('');
      } else {
        setErrorMessage(response.data.message || "Failed to rent the car. Please try again.");
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while submitting your request."
      );
      setSuccessMessage('');
    }
  };

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

          <div className="car-price">
            <p>Total Days: {totalDays > 0 ? totalDays : 1} day(s)</p>
            <p>{totalPrice} PKR (Total)</p>
          </div>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          {car.isAvailable && (
            <button className="rent-button" onClick={handleRentNow}>
              Rent Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalCar;