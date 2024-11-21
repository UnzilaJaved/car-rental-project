import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'; 
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/bookcars'); // Redirect to BookCars if token exists
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/customer/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful");
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        setSuccessMessage("Login successful!");

        navigate('/bookcars'); // Redirect to BookCars after login
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response) {
        setErrorMessage(error.response.data.message || "Invalid credentials.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <section className="vh-100 login-background">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card login-card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="/IMAGES/loginimage6.jpeg"
                    alt="login form"
                    className="img-fluid login-image"
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleLogin}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3 logo-icon"></i>
                        <span className="h1 fw-bold mb-0">CarRental</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3 signin-text">
                        Sign into your account
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      {errorMessage && (
                        <div className="alert alert-danger">
                          {errorMessage}
                        </div>
                      )}

                      {successMessage && (
                        <div className="alert alert-success">
                          {successMessage}
                        </div>
                      )}

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-custom btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>

                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2 account-text">
                        Don't have an account?{" "}
                        <Nav.Link href="/signup">
                          <a href="/signup" className="link-custom">
                            Register here
                          </a>
                        </Nav.Link>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted ms-2">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
