import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.css'; 

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate(); 
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // Clear error message when user starts typing in the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Basic validation for email and password fields
    if (!formData.email || !formData.password) {
      setAlertMessage({ type: 'error', message: 'Email and password are required' });
      return;
    }
  
    try {
      // Send a POST request to the login endpoint
      const response = await axios.post('http://localhost:8073/user/login', formData);
  
      // Log the response for debugging
      console.log('Login response:', response.data);
  
      // Check the status code of the response
      if (response.status === 200) {
        setAlertMessage({ type: 'success', message: 'Successfully signed in!' });
        navigate('/Home');
      } else if (response.status === 401) {
        setAlertMessage({ type: 'error', message: 'Invalid email or password. Please try again.' });
      } else if (response.status === 404) {
        setAlertMessage({ type: 'error', message: 'User not found' });
      } else {
        setAlertMessage({ type: 'error', message: 'Error signing in. Please try again.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage({ type: 'error', message: 'Error signing in. Please try again.' });
    }
  };
  

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">Sign in</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email && 'is-invalid'}`}
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password && 'is-invalid'}`}
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="text-center mb-3">
                  <button type="submit" className="custom-btn">Sign In</button>
                </div>
                <div className="text-center">
                  <p>Don't have an account? <a href="/Signup">Sign up</a></p>
                </div>
              </form>
              {alertMessage && (
                <div className={`alert mt-3 ${alertMessage.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                  {alertMessage.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
