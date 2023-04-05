import React from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";

const DeletePop = ({ title, handleDelete, loading }) => {
  const handleClose = () => {
    $(".deletePopBg").fadeOut(300);
    $(".deletePop").slideUp(500);
  };
  return (
    <>
      <section className="popup-bg deletePopBg">
        <div className="popup deletePop">
          <div className="popup-head">
            <h4>Delete {title}</h4>
            <div className="close" onClick={handleClose}>
              <GrFormClose size="2rem" color="#fff" />
            </div>
          </div>

          <div className="popup-body">
            <p style={{ color: "#000" }}>Are you sure you want to Delete?</p>
          </div>
          <div className="popup-footer">
            <button
              className={`uk-button ${loading ? "disable-cursor" : ""}`}
              onClick={handleDelete}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
            <button className="uk-button cancel-btn" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeletePop;
