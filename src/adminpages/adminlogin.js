import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Import useNavigate if using React Router
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('unzilajaved1217@gmail.com');
  const [password, setPassword] = useState('chandlerbing');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();  // Initialize the navigate function

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    // Check hardcoded admin credentials
    if (email === 'unzilajaved1217@gmail.com' && password === 'chandlerbing') {
      console.log('Login successful');
      navigate('/adminhome'); // Redirect to AdminHome component
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="login-button mt-4">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AdminLogin;
