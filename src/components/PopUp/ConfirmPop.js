import React from "react";
import { Link } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";

const ConfirmPop = ({ msg, link }) => {
  return (
    <section className="popup-bg confirmPopBg">
      <div className="small-popup popup confirmPop">
        <div className="popup-body small-popup-body">
          <p style={{ color: "#000" }}>{msg}</p>
        </div>
        <Link to={link}>
          <div className="small-popup-footer">
            <GiCheckMark size="1rem" />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ConfirmPop;
