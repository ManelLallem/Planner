import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom'; 

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match and meet length requirement
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');

    // Submit the form
    try {
      await axios.post('http://localhost:7010/api/auth/signup', {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        password: form.password,
      });
      alert('Sign up successful! Please log in.');
    } catch (error) {
      console.error('Sign up error:', error);
      setError('An error occurred during sign-up.');
    }
  };

  return (
    <div className="signup-container">
      <h2 className='createAccount'>Create an Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          name="firstName"
          onChange={handleChange}
          placeholder="First Name"
          value={form.firstName}
          required
          className="input-field"
        />
        <input
          name="lastName"
          onChange={handleChange}
          placeholder="Last Name"
          value={form.lastName}
          required
          className="input-field"
        />
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          value={form.username}
          required
          className="input-field"
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          value={form.email}
          required
          className="input-field"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Create Password"
          value={form.password}
          required
          className="input-field"
        />
        <input
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          placeholder="Confirm Password"
          value={form.confirmPassword}
          required
          className="input-field"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="signup-btn" onClick={()=>navigate('/')}>Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
