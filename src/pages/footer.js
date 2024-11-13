import React from 'react';
import './Footer.css'; // Import the CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <h1>RentCar</h1>
          <p>Your trusted car rental partner.</p>
        </div>

        {/* Contact Information Section */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><strong>Address:</strong> 123 RentCar Street, Karachi, Pakistan</p>
          <p><strong>Phone:</strong> +92 300 1234567</p>
          <p><strong>Email:</strong> info@rentalwebsite.com</p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/cars">Cars</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>© 2024 RentCar. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
