import React from "react";
import { useNavigate } from "react-router-dom"; // To handle navigation after logout
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HomePage from "./homePage";
import WhyChooseUs from "./whychooseus";
import Testimonials from "./Testinomials";
import FeaturedVehicles from "./Vehicles";
import Footer from "./footer";
import './NavBar.css';

function NavScrollExample() {
  const navigate = useNavigate();

  // Logout function to clear the token and navigate to login page
  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove the token from localStorage
    navigate("/");  // Redirect to login page
  };

  return (
    <div>
      {/* Customized Navbar */}
      <Navbar expand="lg" className="custom-navbar">
        <Container fluid>
          {/* Logo or Brand Name */}
          <Navbar.Brand href="/" className="navbar-brand-custom">Car Rental</Navbar.Brand>
          
          {/* Toggle button for mobile view */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          
          {/* Collapsible section */}
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
              <Nav.Link href="/aboutus" className="nav-link-custom">About Us</Nav.Link>
              <Nav.Link href="/testimonials" className="nav-link-custom">Reviews</Nav.Link>
              <Nav.Link href="/contact" className="nav-link-custom">Contact Us</Nav.Link>
            </Nav>
            
            {/* Right-side buttons */}
            <Nav>
              <Nav.Link href="/bookcars" className="me-2">
                <Button variant="primary" className="book-btn">Book a Car</Button> {/* Book a Car Button */}
              </Nav.Link>
              <Nav.Link href="/signup" className="me-2">
                <Button variant="outline-success">Signup</Button> {/* Signup Button */}
              </Nav.Link>

              {/* Logout Button */}
              <Nav.Link onClick={handleLogout}>
                <Button variant="outline-primary">Logout</Button> {/* Logout Button */}
              </Nav.Link>

              {/* Login Button */}
              <Nav.Link href="/login">
                <Button variant="outline-primary">Login</Button> {/* Login Button */}
              </Nav.Link>
              
              <Nav.Link href="/adminlogin">
                <Button variant="outline-primary">Admin</Button> {/* admin Button */}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page content below */}
      <HomePage/>
      <WhyChooseUs/>
      <Testimonials/>
      <FeaturedVehicles/>
      <Footer/>
    </div>
  );
}

export default NavScrollExample;
