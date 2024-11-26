import React from 'react';
import './home.css'; 
import { useNavigate } from 'react-router-dom'; 


const Home = () => {
    const navigate = useNavigate()
  return (
    <div className="home-container">
      <h1 className="title">Welcome to Your Planner</h1>
      <p className="description">Organize your tasks and stay on top of your schedule!</p>
      <div className="buttons-container">
        <button className="signup-button" onClick={()=>navigate('/signup')}>Sign Up</button>
        <button className="login-button"onClick={()=>navigate('/login')}>Log In</button>
      </div>
    </div>
  );
};

export default Home;
