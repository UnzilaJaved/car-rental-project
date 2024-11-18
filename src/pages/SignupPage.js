import React, { useState } from "react";
import './SignUpPage.css'; // Import the CSS file for styling
import axios from 'axios'; // Import Axios for making HTTP requests

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        name,
        email,
        password,
      });

      // Handle successful signup
      if (response.data.success) {
        console.log("Signup successful");
        // Redirect user to login or dashboard page
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="vh-100 signup-background">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card signup-card">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form className="mx-1 mx-md-4" onSubmit={handleSignup}>
                      <div className="input-group mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw input-icon"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control rounded-input"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Update name
                            required
                          />
                        </div>
                      </div>

                      <div className="input-group mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw input-icon"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control rounded-input"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email
                            required
                          />
                        </div>
                      </div>

                      <div className="input-group mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw input-icon"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control rounded-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password
                            required
                          />
                        </div>
                      </div>

                      <div className="input-group mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw input-icon"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control rounded-input"
                            placeholder="Repeat your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword
                            required
                          />
                        </div>
                      </div>

                      {errorMessage && (
                        <div className="alert alert-danger">
                          {errorMessage}
                        </div>
                      )}

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          id="form2Example3c"
                        />
                        <label className="form-check-label" htmlFor="form2Example3c">
                          I agree to all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-custom btn-lg">
                          Register
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid rounded-image"
                      alt="Signup illustration"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
