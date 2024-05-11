import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: ''
  });
  const [errorMessages, setErrorMessages] = useState({
    fname: '',
    lname: '',
    email: '',
    password: ''
  });
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate(); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form fields
    if (!formData.fname) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        fname: 'First name is required'
      }));
      return;
    }
    if (!formData.lname) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        lname: 'Last name is required'
      }));
      return;
    }
    if (!formData.email) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        email: 'Email is required'
      }));
      return;
    }
    if (!formData.password) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: 'Password is required'
      }));
      return;
    }

    try {
      const response = await axios.post('https://astronomy-2.onrender.com/user/register', formData);
      
      console.log(response.data);
      setAlertMessage({ type: 'success', message: 'Successfully signed up!' });
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">Sign up</h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="fname" className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fname"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                      />
                      {errorMessages.fname && <div className="text-danger">{errorMessages.fname}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="lname" className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                      />
                      {errorMessages.lname && <div className="text-danger">{errorMessages.lname}</div>}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label-sm">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errorMessages.email && <div className="text-danger">{errorMessages.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errorMessages.password && <div className="text-danger">{errorMessages.password}</div>}
                </div>
                <div className="text-center mb-3">
                  <button type="submit" className="custom-btn">Sign Up</button>
                </div>
              </form>
              <div className="text-center">
                <p>Already have an account? <a href="/">Sign in</a></p>
              </div>
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
