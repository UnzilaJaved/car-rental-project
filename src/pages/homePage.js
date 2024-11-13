import React from "react";
import './homePage.css'; // Link to your custom styles
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function HomePage() {
  return (
    <div className="homepage">
      <div className="container">
        <div className="text-section">
          <h1>
            <span className="highlight">Discover the Joy</span> of Hassle-Free Car Rentals
          </h1>
          <p className="subtitle">
            Choose from our collection of stylish and modern cars. Affordable, convenient, and available to you 24/7.
          </p>
          <Nav.Link href="/bookcars">
          <button className="primary-btn">Book Your Ride Now</button>
              </Nav.Link>
         
        </div>
        <div className="image-section">
          <img
            src="/IMAGES/carhome.jpg"
            alt="Stylish Car"
            className="car-image"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
