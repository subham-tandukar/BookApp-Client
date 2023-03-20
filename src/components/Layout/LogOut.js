import React from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";

const LogOut = ({logoutHandler}) => {
  const handleClose = () => {
    $(".log-out-bg").fadeOut(300);
    $(".log-out").slideUp(500);
  };
  return (
    <>
      <section className="popup-bg log-out-bg">
        <div className="popup log-out">
          <div className="popup-head">
            <h4>Log Out</h4>
            <div className="close" onClick={handleClose}>
              <GrFormClose size="2rem" color="#fff" />
            </div>
          </div>

          <div className="popup-body">
            <p style={{ color: "#000" }}>Are you sure you want to logout?</p>
          </div>
          <div className="popup-footer">
            <button className="uk-button " onClick={logoutHandler}>
              Yes
            </button>
            <button
              className="uk-button cancel-btn"
              onClick={handleClose}
            >
              No
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogOut;
