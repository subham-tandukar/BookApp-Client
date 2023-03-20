import React from "react";
import logo from "../img/logo.png";
import img from "../img/login.gif";
const WelcomePage = () => {
  return (
    <>
      <div className="welcome_page welcomePop">
        <div className="wrapper">
          <img className="logo" src={logo} alt="" />
          <h1 className="mt-5">Welcome To HTD</h1>
          <h5>
            <span>Read</span> and <span>Lead</span>
          </h5>
          <img className="gif" src={img} alt="" />
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
