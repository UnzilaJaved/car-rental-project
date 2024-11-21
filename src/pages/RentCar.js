import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./RentalCar.css";

const RentalCar = () => {
  const location = useLocation();
  const { car } = location.state || {}; // Car information passed from the previous page
  const token = localStorage.getItem("token");
    
  // Local state variables
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [totalDays, setTotalDays] = useState(1); // Default to 1 day
  const [totalPrice, setTotalPrice] = useState(car?.daily_rate || 0); // Use the car's daily rate
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UseEffect to calculate total price based on dates
  useEffect(() => {
    if (rentalDate && returnDate) {
      const rental = new Date(rentalDate);
      const returning = new Date(returnDate);

      // Calculate the difference in days
      const days = Math.ceil((returning - rental) / (1000 * 3600 * 24));
      if (days > 0) {
        setTotalDays(days);
        setTotalPrice(days * car.daily_rate); // Calculate total price
      } else {
        setTotalDays(1); // Minimum rental period is 1 day
        setTotalPrice(car.daily_rate);
      }
    }
  }, [rentalDate, returnDate, car?.daily_rate]);

  // Handle form submission
  const handleRentNow = async () => {
    // Validate dates
    if (!rentalDate || !returnDate) {
      setErrorMessage("Please select both rental and return dates.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Send the rental request to the backend
      const response = await axios.post("http://127.0.0.1:8000/api/rent-car", {
        veh_id: car.id,           // Car ID (veh_id in the database)         // Customer ID (we'll assume it's 1 here; in real implementation, use the logged-in user's ID)
        start_date: rentalDate,   // Rental start date (start_date in the database)
        end_date: returnDate,     // Rental end date (end_date in the database)
        total_price: totalPrice,  // Total price (total_price in the database)
      },{headers:{Authorization:`Bearer ${token}`}});

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
      setIsSubmitting(false); // Reset submitting state
    }
  };

  // If no car is passed through location state, show an error message
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
            <p>Total Price: {totalPrice} MAD</p>
          </div>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <button
            className="rent-button"
            onClick={handleRentNow}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Rent Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentalCar;
