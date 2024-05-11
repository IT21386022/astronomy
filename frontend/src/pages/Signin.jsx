import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    if (!formData.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email is required'
      }));
    }
    if (!formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password is required'
      }));
    }
    if (!formData.email || !formData.password) {
      return;
    }

    try {
      // Mocking sign-in functionality with a console log
      console.log('Signing in with:', formData);
      setAlertMessage({ type: 'success', message: 'Successfully signed in!' });
      navigate('/Home');
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
                <p>Already have an account? <a href="/Signup">Sign up</a></p>
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


  
