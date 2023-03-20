import React from "react";
import { GiCheckMark } from "react-icons/gi";

const ChangePasswordPop = ({ logoutHandler }) => {
  return (
    <section className="popup-bg changePassPopBg">
      <div className="small-popup popup changePassPop">
        <div className="popup-body small-popup-body">
          <p style={{ color: "#000" }}>
            Password changed successfully ! <br /> Go back to login page and
            login with new password.
          </p>
        </div>
        <button onClick={logoutHandler} className="border-0 w-100">
          <div className="small-popup-footer">
            <GiCheckMark size="1rem" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default ChangePasswordPop;
