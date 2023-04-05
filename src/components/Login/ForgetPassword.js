import React, { useContext, useState, useEffect } from "react";
import logo from "../../img/logo.png";
import img from "../../img/login.gif";
import { toast } from "react-toastify";
import AuthContext from "../context/auth-context";
import NavbarContext from "../context/navbar-context";
import { Fetchdata } from "../hooks/getData";
import $ from "jquery";
import Toast from "../Toast";
import Loading from "../Loading/Loading";
import ConfirmPop from "../PopUp/ConfirmPop";
import OtpInput from "react-otp-input";
import { FaRegEye, FaRegEyeSlash, FaLongArrowAltLeft } from "react-icons/fa";

const ForgetPassword = () => {
  const { login } = useContext(AuthContext);
  const { baseURL } = useContext(NavbarContext);
  const [passwordType, setPasswordType] = useState("password");
  const initialvalue = { name: "", email: "", password: "" };
  const [inputData, setInputData] = useState(initialvalue);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [otpData, setOtpData] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [otpPop, setOtpPop] = useState(false);
  const [loader, setLoader] = useState(false);
  const [confirmPop, setConfirmPop] = useState(false);

  const [verified, setVerified] = useState(false);

  const newValue = { password: "" };
  const [newInputData, setNewInputData] = useState(newValue);
  const [newFormError, setNewFormError] = useState({});
  const [isNewSubmit, setIsNewSubmit] = useState(false);

  const showPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(inputData));
    setIsSubmit(true);
  };

  //   sign up api-----------------------------------
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      const dataForm = {
        Email: inputData.email,
        FetchURL: `${baseURL}/api/resendOtp`,
        Type: "POST",
      };

      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            setOtpPop(true);

            setIsSubmit(false);
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
  }, [formError]);

  // --- for otp verification ---
  function handleOtpChange(otpData) {
    setOtpData(otpData);
  }

  const handleVerify = (e) => {
    e.preventDefault();
    if (otpData === "") {
      toast.error("OTP shouldn't be empty", {
        theme: "light",
      });
    } else {
      setIsVerify(true);
    }
  };

  //   verify otp api-----------------------------------
  useEffect(() => {
    if (isVerify) {
      const dataForm = {
        Email: inputData.email,
        OTP: otpData,
        FetchURL: `${baseURL}/api/otp`,
        Type: "POST",
      };

      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            setLoader(true);
            setTimeout(() => {
              setLoader(false);
              //   setConfirmPop(true);
              setVerified(true);
              setIsVerify(false);
              toast.success("Verified Sucessfully", {
                theme: "light",
              });
            }, 3000);
          } else {
            toast.error(result.Message, {
              theme: "light",
            });
            setIsVerify(false);
          }
        })
        .catch((result) => {
          setIsVerify(false);
        });
    } else {
      setIsVerify(false);
    }
  }, [isVerify]);

  //   ------ to create new password ------------

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewInputData({ ...newInputData, [name]: value });
  };

  const newValidate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const handleNewSubmit = (e) => {
    e.preventDefault();
    setNewFormError(newValidate(newInputData));
    setIsNewSubmit(true);
  };

  //   new password api-----------------------------------
  useEffect(() => {
    if (Object.keys(newFormError).length === 0 && isNewSubmit) {
      const dataForm = {
        Email: inputData.email,
        NewPassword: newInputData.password,
        FetchURL: `${baseURL}/api/forget-password`,
        Type: "POST",
      };

      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            setLoader(true);
            setTimeout(() => {
              setLoader(false);
              setConfirmPop(true);
              setIsNewSubmit(false);
            }, 3000);
          } else {
            toast.error(result.Message, {
              theme: "light",
            });
            setIsNewSubmit(false);
          }
        })
        .catch((result) => {
          setIsNewSubmit(false);
        });
    } else {
      setIsNewSubmit(false);
    }
  }, [newFormError]);

  useEffect(() => {
    if (confirmPop) {
      $(".confirmPopBg").fadeIn(500);
      $(".confirmPop").slideDown(500);
    }
  }, [confirmPop]);

  const handleBack = () => {
    setOtpPop(false);
    setOtpData("");
  };

  return (
    <>
      <Toast />
      {loader && <Loading />}
      <ConfirmPop
        msg="Password changed successfully! Please login to continue"
        link="/login"
      />
      <div className="login-form">
        <div className="wrapper mb_30 ">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <div className="logo">
                <img src={logo} alt="" />
              </div>
              <div className="login-img">
                <img src={img} alt="" />
              </div>
            </div>
            {verified === false ? (
              <>
                {otpPop === false ? (
                  <div className="col-md-6">
                    <h5>Forgot password?</h5>
                    <h3 className="mb-3">
                      Verify your Email to change password.
                    </h3>
                    <div className="modal-content cs_modal">
                      {/* <div className="modal-header justify-content-center theme_bg_1">
                    <h5 className="modal-title text_white">Log in</h5>
                  </div> */}
                      <form className="modal-body login-body">
                        <div className="form-wrapper">
                          <input
                            type="text"
                            className="uk-input"
                            name="email"
                            onChange={handleChange}
                            value={inputData.email}
                            autoComplete="off"
                            required
                          />
                          <span class="span">Email</span>
                        </div>
                        <p className="errormsg mb-3">{formError.email}</p>

                        <button
                          className={`uk-button submit btn_1 full_width text-center ${
                            isSubmit ? "disable-cursor" : ""
                          }`}
                          onClick={handleSubmit}
                        >
                          {isSubmit ? (
                            <span>Loading...</span>
                          ) : (
                            <span>Submit</span>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="col-md-6">
                    <h5 className="signUp" onClick={handleBack}>
                      <FaLongArrowAltLeft />
                      {inputData.email}
                    </h5>
                    <h3 className="mb-1">Enter Code</h3>
                    <p className="mb-2">
                      We emailed a code to {inputData.email}
                      <br /> Please enter the code to verify your email.{" "}
                    </p>
                    <div className="modal-content cs_modal">
                      <form className="modal-body login-body">
                        <div className="otpInput">
                          <OtpInput
                            value={otpData}
                            inputStyle="inputStyle"
                            onChange={handleOtpChange}
                            numInputs={6}
                            shouldAutoFocus="true"
                          />
                        </div>

                        <button
                          className={`uk-button submit btn_1 full_width text-center ${
                            isVerify ? "disable-cursor" : ""
                          }`}
                          onClick={handleVerify}
                        >
                          {isVerify ? (
                            <span>Verifying ...</span>
                          ) : (
                            <span>Verify</span>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="col-md-6">
                  <h5>Verified Successful.</h5>
                  <h3 className="mb-3">Create a new password.</h3>
                  <div className="modal-content cs_modal">
                    <form className="modal-body login-body">
                      <div className="form-wrapper">
                        <input
                          type={passwordType}
                          className="uk-input"
                          name="password"
                          onChange={handleNewChange}
                          value={newInputData.password}
                          autoComplete="off"
                          required
                        />
                        <span class="span">New Password</span>
                        <span
                          className="toggle-password"
                          uk-toggle="target: .toggle"
                          onClick={showPassword}
                        >
                          <i className="toggle" uk-tooltip="Show Password">
                            <FaRegEyeSlash />
                          </i>
                          <i
                            className="toggle"
                            uk-tooltip="Hide Password"
                            hidden
                          >
                            <FaRegEye />
                          </i>
                        </span>
                      </div>
                      <p className="errormsg ">{newFormError.password}</p>

                      <button
                        className={`uk-button submit btn_1 full_width text-center ${
                          isNewSubmit ? "disable-cursor" : ""
                        }`}
                        onClick={handleNewSubmit}
                      >
                        {isNewSubmit ? (
                          <span>Loading...</span>
                        ) : (
                          <span>Submit</span>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
