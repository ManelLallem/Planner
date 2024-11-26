import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Import the CSS file

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7010/api/auth/login', form);
      localStorage.setItem('token', response.data.token);
      navigate("/planner");
      console.log("You are logged in");
    } catch (error) {
      console.error('Login error:', error);
      // You can handle errors by setting an error message here if needed
    }
  };

  return (
    <div className="login-container">
      <h2 className='Login'>Log into you account</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          name="username"
          className="input-field"
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          name="password"
          type="password"
          className="input-field"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" className="login-btn">Log In</button>
      </form>
    </div>
  );
}

export default Login;
