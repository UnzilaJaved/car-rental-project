import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./RentalCar.css";

const RentalCar = () => {
  const location = useLocation();
  const { car } = location.state || {};

  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [totalDays, setTotalDays] = useState(1); // Default to 1 day
  const [totalPrice, setTotalPrice] = useState(car?.daily_rate || 0); // Use `daily_rate` from the database
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (rentalDate && returnDate) {
      const rental = new Date(rentalDate);
      const returning = new Date(returnDate);

      // Calculate the difference in days
      const days = Math.ceil((returning - rental) / (1000 * 3600 * 24));
      if (days > 0) {
        setTotalDays(days);
        setTotalPrice(days * car.daily_rate); // Use `daily_rate` to calculate total price
      } else {
        setTotalDays(1); // Minimum rental period is 1 day
        setTotalPrice(car.daily_rate);
      }
    }
  }, [rentalDate, returnDate, car?.daily_rate]);

  const handleRentNow = async () => {
    if (!rentalDate || !returnDate) {
      setErrorMessage("Please select both rental and return dates.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/rent-car", {
        car_id: car.id,
        rental_date: rentalDate,
        return_date: returnDate,
        total_price: totalPrice,
      });

      if (response.status === 200) {
        setSuccessMessage("Car rental request submitted successfully!");
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message || "Failed to rent the car. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while submitting your request."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!car) return <div>No car information found. Please go back and select a car.</div>;

  return (
    <div className="rental-car-page">
      <div className="car-image-section">
        <img src={car.image || "/default-placeholder.png"} alt={car.model} className="car-large-image" />
      </div>
      <div className="car-details-section">
        <h2>{car.model}</h2>
        <div className="car-rental-form">
          <label htmlFor="rentalDate">Rental Date</label>
          <input
            type="date"
            id="rentalDate"
            value={rentalDate}
            onChange={(e) => setRentalDate(e.target.value)}
          />

          <label htmlFor="returnDate">Return Date</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />

          <div className="car-price">
            <p>Total Days: {totalDays}</p>
            <p>Total Price: {totalPrice} PKR</p>
          </div>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          {car.status === 1 && (
            <button
              className="rent-button"
              onClick={handleRentNow}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Rent Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalCar;
