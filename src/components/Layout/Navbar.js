import React, { useContext, useEffect, useState } from "react";
import $ from "jquery";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import LogOut from "./LogOut";
import ham from "../../img/ham.png";
import bell from "../../img/icon/bell.svg";
import placeholder from "../../img/placeholder.png";
import ChangePassword from "../setting/ChangePassword";

const Navbar = ({ userDetails, handleMobHam, handleHam }) => {
  const { logout } = useContext(AuthContext);
  let navigate = useNavigate();

  const [changePassPopup, setChangePassPopup] = useState(false);

  const logoutHandler = (e) => {
    localStorage.clear();
    sessionStorage.clear();
    logout();
    navigate("/");
  };

  const handleLogout = () => {
    $(".log-out-bg").fadeIn(300);
    $(".log-out").slideDown(500);
  };

  const handleSetting = () => {
    setChangePassPopup(true);
  };

  // --- to get the time---
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setTimeOfDay("Good morning !");
    } else if (currentHour >= 12 && currentHour < 18) {
      setTimeOfDay("Good afternoon !");
    } else {
      setTimeOfDay("Good evening !");
    }
  }, []);

  return (
    <>
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-lg-12 p-0">
            <div className="header_iner d-flex justify-content-between align-items-center">
              <div className="sidebar_icon d-lg-none" onClick={handleMobHam}>
                <img src={ham} alt="" style={{ cursor: "pointer" }} />
              </div>
              <div
                className="line_icon open_miniSide d-none d-lg-block"
                onClick={handleHam}
              >
                <img src={ham} alt="" style={{ cursor: "pointer" }} />
              </div>
              <div className="header_right d-flex justify-content-between align-items-center">
                {/* <div className="header_notification_warp d-flex align-items-center">
                  <li>
                    <a className="bell_notification_clicker" href="#">
                      <img src={bell} alt="" />
                      <span>2</span>
                    </a>

                    <div className="Menu_NOtification_Wrap">
                      <div className="notification_Header">
                        <h4>Notifications</h4>
                      </div>
                      <div className="Notification_body">
                        <div className="single_notify d-flex align-items-center">
                          <div className="notify_thumb">
                            <a href="#">
                              <img src={placeholder} alt="" />
                            </a>
                          </div>
                          <div className="notify_content">
                            <a href="#">
                              <h5>Cool Marketing</h5>
                            </a>
                            <p>Lorem ipsum dolor sit amet</p>
                          </div>
                        </div>

                        <div className="single_notify d-flex align-items-center">
                          <div className="notify_thumb">
                            <a href="#">
                              <img src={placeholder} alt="" />
                            </a>
                          </div>
                          <div className="notify_content">
                            <a href="#">
                              <h5>Awesome packages</h5>
                            </a>
                            <p>Lorem ipsum dolor sit amet</p>
                          </div>
                        </div>

                        <div className="single_notify d-flex align-items-center">
                          <div className="notify_thumb">
                            <a href="#">
                              <img src={placeholder} alt="" />
                            </a>
                          </div>
                          <div className="notify_content">
                            <a href="#">
                              <h5>what a packages</h5>
                            </a>
                            <p>Lorem ipsum dolor sit amet</p>
                          </div>
                        </div>

                        <div className="single_notify d-flex align-items-center">
                          <div className="notify_thumb">
                            <a href="#">
                              <img src={placeholder} alt="" />
                            </a>
                          </div>
                          <div className="notify_content">
                            <a href="#">
                              <h5>Cool Marketing</h5>
                            </a>
                            <p>Lorem ipsum dolor sit amet</p>
                          </div>
                        </div>

                        <div className="single_notify d-flex align-items-center">
                          <div className="notify_thumb">
                            <a href="#">
                              <img src={placeholder} alt="" />
                            </a>
                          </div>
                          <div className="notify_content">
                            <a href="#">
                              <h5>Awesome packages</h5>
                            </a>
                            <p>Lorem ipsum dolor sit amet</p>
                          </div>
                        </div>

                        <div className="single_notify d-flex align-items-center">
                          <div className="notify_thumb">
                            <a href="#">
                              <img src={placeholder} alt="" />
                            </a>
                          </div>
                          <div className="notify_content">
                            <a href="#">
                              <h5>what a packages</h5>
                            </a>
                            <p>Lorem ipsum dolor sit amet</p>
                          </div>
                        </div>
                      </div>
                      <div className="nofity_footer">
                        <div className="submit_button text-center pt_20">
                          <a href="#" className="btn_1">
                            See More
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                </div> */}

                <div className="d-flex gap-3 align-items-center">
                  <div className="loggedin-user">
                    Logged in as:
                    <span>{userDetails.Email}</span>
                  </div>

                  <div className="profile_info">
                    <img src={userDetails.Profile} alt="#" />
                    <div className="profile_info_iner">
                      <div className="profile_author_name">
                        <p>{timeOfDay}</p>
                        <h5 className="uk-text-capitalize">
                          {userDetails.Name}
                        </h5>
                      </div>
                      <div className="profile_info_details">
                        {/* <a href="#">My Profile </a> */}
                        <a onClick={handleSetting}>Settings</a>
                        <a onClick={handleLogout}>Log Out </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChangePassword
        changePassPopup={changePassPopup}
        setChangePassPopup={setChangePassPopup}
        userDetails={userDetails}
        logoutHandler={logoutHandler}
      />
      <LogOut logoutHandler={logoutHandler} />
    </>
  );
};

export default Navbar;
