import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
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
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        onChange={handleChange}
        placeholder="First Name"
        value={form.firstName}
        required
      />
      <input
        name="lastName"
        onChange={handleChange}
        placeholder="Last Name"
        value={form.lastName}
        required
      />
      <input
        name="username"
        onChange={handleChange}
        placeholder="Username"
        value={form.username}
        required
      />
      <input
        name="email"
        type="email"
        onChange={handleChange}
        placeholder="Email"
        value={form.email}
        required
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Create Password"
        value={form.password}
        required
      />
      <input
        name="confirmPassword"
        type="password"
        onChange={handleChange}
        placeholder="Confirm Password"
        value={form.confirmPassword}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
