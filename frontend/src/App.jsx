import React from 'react';
import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Planner from './components/Planner';

function App(props) {
  return (
    <>
      <BrowserRouter>

      {/*<nav>
        <Link to="/"> Home</Link>
        <Link to="/login"> Login</Link>
        <Link to="/signup"> SignUp</Link>
        <Link to="/planner"> Planner</Link>
      </nav>*/}

      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path='/planner' element={<Planner/>}/>
      
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;