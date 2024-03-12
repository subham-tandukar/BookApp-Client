import React, { useContext, useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fetchdata } from "../hooks/getData";
import $ from "jquery";
import NavbarContext from "../context/navbar-context";
import ChangePasswordPop from "./ChangePasswordPopup";
import Loading from "../Loading/Loading";
import TextField from "@mui/material/TextField";

const ChangePassword = ({
  changePassPopup,
  setChangePassPopup,
  userDetails,
  logoutHandler,
}) => {
  const initalvalue = { oldPassword: "", newPassword: "" };
  const [formValues, setFormValues] = useState(initalvalue);
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loader, setLoader] = useState(false);
  const [confirmPop, setConfirmPop] = useState(false);

  const { baseURL } = useContext(NavbarContext);

  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(validate(formValues));
    setIsSubmit(true);
  };

  const closePopUp = () => {
    setChangePassPopup(false);
    $(".changePasswordPop").slideUp(500);
    $(".changePasswordPopBg").fadeOut(500);
    setFormValues(initalvalue);
    setformErrors({});
    setIsSubmit(false);
  };

  useEffect(() => {
    if (changePassPopup) {
      $(".changePasswordPopBg").fadeIn(500);
      $(".changePasswordPop").slideDown(500);
    }
  }, [changePassPopup]);

  const validate = (values) => {
    const errors = {};

    if (values.oldPassword && values.newPassword) {
      //code here
    } else {
      if (!values.oldPassword) {
        errors.oldPassword = "Required";
      }
      if (!values.newPassword) {
        errors.newPassword = "Required";
      }
      return errors;
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const dataForm = {
        Email: userDetails.Email,
        OldPassword: formValues.oldPassword,
        NewPassword: formValues.newPassword,
        FetchURL: `${baseURL}/api/change-password`,
        Type: "POST",
      };

      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            setLoader(true);
            $(".changePasswordPop").slideUp(500);
            $(".changePasswordPopBg").fadeOut(500);
            setFormValues(initalvalue);
            //   toast.success(result.Message, {
            //     theme: "light",
            //   });
            //   setChangePassPopup(false);
            setTimeout(() => {
              setLoader(false);
              setConfirmPop(true);
            }, 1000);
          } else {
            toast.error(result.Message, {
              theme: "light",
            });
            setIsSubmit(false);
          }
        })
        .catch((result) => {
          setIsSubmit(false);
        });
    } else {
      setIsSubmit(false);
    }
  }, [formErrors]);

  useEffect(() => {
    if (confirmPop) {
      $(".changePassPopBg").fadeIn(500);
      $(".changePassPop").slideDown(500);
    }
  }, [confirmPop]);

  return (
    <>
      <div className="popup-bg changePasswordPopBg">
        <div className="popup changePasswordPop">
          <div className="popup-head">
            <h4>Change Password</h4>
            <div className="close" onClick={closePopUp}>
              <GrFormClose size="2rem" color="#fff" />
            </div>
          </div>
          <div className="popup-body">
            <form className="form-padding">
              <div className="row text-start">
                <div className="form-group">
                  <div className="common_input mb_15">
                    <TextField
                      id="outlined-basic"
                      label="Old Password*"
                      variant="outlined"
                      size="small"
                      name="oldPassword"
                      onChange={handleChange}
                      value={formValues.oldPassword}
                    />
                    <p className="errormsg">{formErrors.oldPassword}</p>
                  </div>
                </div>
              </div>

              <div className="row text-start mt-3">
                <div className="common_input mb_15">
                  <TextField
                    id="outlined-basic"
                    label="New Password*"
                    variant="outlined"
                    size="small"
                    name="newPassword"
                    onChange={handleChange}
                    value={formValues.newPassword}
                  />
                  <p className="errormsg">{formErrors.newPassword}</p>
                </div>
              </div>
            </form>
          </div>

          <div className="popup-footer">
            <button
              className={`uk-button ${isSubmit ? "disable-cursor" : ""}`}
              onClick={handleSubmit}
            >
              {isSubmit ? "Changing ..." : "Change"}
            </button>
            <button className="uk-button cancel-btn" onClick={closePopUp}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      {loader && <Loading title="" />}
      <ChangePasswordPop logoutHandler={logoutHandler} />
    </>
  );
};

export default ChangePassword;
