import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('unzilajaved1217@gmail.com'); // Default credentials for quick testing
  const [password, setPassword] = useState('chandlerbing');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle submission feedback

  const navigate = useNavigate(); // React Router navigation

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true); // Indicate the form is being processed

    // Simulate delay for processing (e.g., API call)
    setTimeout(() => {
      if (!email || !password) {
        setError('Please enter both email and password.');
        setIsSubmitting(false);
        return;
      }

      // Validate hardcoded admin credentials
      if (email === 'unzilajaved1217@gmail.com' && password === 'chandlerbing') {
        console.log('Login successful');
        navigate('/adminhome'); // Redirect to AdminHome page
      } else {
        setError('Invalid email or password.');
      }
      setIsSubmitting(false); // Reset submission state
    }, 1000);
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">Admin Login</h2>
        
        {/* Display error message */}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        
        <Form onSubmit={handleSubmit} className="login-form">
          {/* Email Input */}
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {/* Password Input */}
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            className="login-button mt-4"
            disabled={isSubmitting} // Disable button during submission
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AdminLogin;
