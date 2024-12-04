import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookCar.css";

// CarCard Component
const CarCard = ({ model, price, year, image, onRent, isAvailable }) => (
  <div className="car-card">
    <img 
      src={image ? image : "/default-placeholder.png"} 
      alt={model} 
      className="car-image" 
    />
    <h3>{model}</h3>
    <p>Year: {year}</p>
    <p>Price: {price} PKR/day</p>
    <button
      className="rent-button"
      onClick={onRent}
      disabled={!isAvailable}
    >
      {isAvailable ? "Rent Now" : "Not Available"}
    </button>
  </div>
);

// Main BookCars Component
const BookCars = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isLoggedIn = !!token;

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  // Fetch car data from the API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/list", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
        setError("Error fetching car data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) fetchCars();
  }, [isLoggedIn, token]);

  // Handle renting a car
  const handleRentClick = (car) => {
    navigate("/rental-car", { state: { car } });
  };

  // Show a loading message while data is being fetched
  if (loading) return <div>Loading cars...</div>;

  // Show an error message if there is an issue
  if (error) return <div>{error}</div>;

  return (
    <div className="book-cars">
      <h1>Book Cars</h1>
      <div className="car-grid">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            model={car.model}
            year={car.year}
            price={car.daily_rate} 
            image={car.image_url} 
            onRent={() => handleRentClick(car)}
            isAvailable={car.status == 1}
          />
        ))}
      </div>
    </div>
  );
};

export default BookCars;
