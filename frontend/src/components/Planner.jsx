
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./planner.css";
import Today from "./Today";
import Calendar from "./Calendar";

function Planner() {
  const [date, setDate] = useState(new Date());
  const token = localStorage.getItem("token");
  const [selected,setSelected] = useState(0)
  const options=["Today","Calander","Search","My tags","My goals"]
  const [userId, setUserId] = useState("");
  const [userData,setUserData]=useState(null)


  const getUserData = async (id) => {
    try {
      console.log("loading data")
      const response = await axios.get(`http://localhost:7010/api/auth/user/${id}`);
      console.log('User data fetched:', response.data);
      setUserData(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (token) {
      // Decode the token to extract the username and userId
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);  // Make sure the decoded token includes userId
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      console.log("this is the user id " + userId)
      getUserData(userId);
    }
  }, [userId]);
  const renderContent = () => {
    switch (selected) {
      case 0:
        return <Today id={userId} />;
      case 1:
        return <Calendar id={userId}/>;
      default:
        return <Today/>;
    }}


  return (
    <div id="planner">
      <section id="sidebar">
        <div id="profile">
          <div id="profilePic"></div>
            { userData?(<p className="user" id="username">{userData.username}</p>):("empty")}
          <div id="moreOptions" className="more-options">
            <div id="dot-btn">
              <img
                src="ellipsis.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <h2 className="user" id="date">
          {date.toDateString()}
        </h2>
        {options.map((option,index)=>(<p key={index} onClick={()=>setSelected(index)} className={`option ${selected=== index ? "option-selected" : ""}` }>{option}</p>))}
      </section>
      <section id="content">
      {renderContent()} 
      </section>
    </div>
  );
}

export default Planner;
