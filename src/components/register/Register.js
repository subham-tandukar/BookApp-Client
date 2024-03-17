import React, { useContext, useState, useEffect } from "react";
import logo from "../../img/logo.png";
import img from "../../img/login.gif";
import CloseIcon from "../../img/CloseIcon.svg";
import placeholder from "../../img/placeholder.png";
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
import { Link } from "react-router-dom";

const Register = () => {
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

  const [resend, setResend] = useState(false);

  const [image, setImage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const showPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  // set image
  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }

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
        Name: inputData.name,
        Email: inputData.email,
        Password: inputData.password,
        Profile: image
          ? image
          : "https://res.cloudinary.com/de3eu0mvq/image/upload/v1678434591/profile/taztcmb8jl9pxe1yqzd3.png",
        FLAG: "I",
        FetchURL: `${baseURL}/api/user`,
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
  function handleOtpChange(data) {
    setOtpData(data);
    if (otpData.length === 5) {
      setIsVerify(true);
    }
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
              setConfirmPop(true);
              setIsVerify(false);
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

  useEffect(() => {
    if (confirmPop) {
      $(".confirmPopBg").fadeIn(500);
      $(".confirmPop").slideDown(500);
    }
  }, [confirmPop]);

  //   resend otp api-----------------------------------

  const handleResend = (e) => {
    e.preventDefault();
    setResend(true);
  };

  useEffect(() => {
    if (resend) {
      const dataForm = {
        Email: inputData.email,
        FetchURL: `${baseURL}/api/resendOtp`,
        Type: "POST",
      };

      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            toast.success("OTP send sucessfully", {
              theme: "light",
            });
            setOtpData("");
            setResend(false);
          } else {
            toast.error(result.Message, {
              theme: "light",
            });
            setResend(false);
          }
        })
        .catch((result) => {
          setResend(false);
        });
    } else {
      setResend(false);
    }
  }, [resend]);

  const handleBack = () => {
    setOtpPop(false);
    setOtpData("");
  };

  return (
    <>
      <Toast />
      {loader && <Loading />}
      <ConfirmPop
        msg="Verified successfully! Please login to continue"
        link="/login"
      />
      <div className="login-form my-form">
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
            {otpPop === false ? (
              <div className="col-md-6">
                <h5>Hello !</h5>
                <h3 className="mb-3">Welcome back. Sign up to login</h3>
                <div className="modal-content cs_modal">
                  {/* <div className="modal-header justify-content-center theme_bg_1">
                    <h5 className="modal-title text_white">Log in</h5>
                  </div> */}
                  <form className="modal-body login-body">
                    <div className="profile uk-flex uk-flex-middle">
                      <div className="BoxUpload ProfileUpload">
                        <div className="image-upload">
                          {!isUploaded ? (
                            <>
                              <label
                                htmlFor="upload-image"
                                style={{ paddingLeft: "0" }}
                              >
                                <img
                                  src={placeholder}
                                  draggable={"false"}
                                  alt="profile"
                                  style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: "50%",
                                  }}
                                />
                                <span className="img-txt">Upload Photo</span>
                              </label>

                              <input
                                type="file"
                                name="bookImg"
                                accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                                onChange={handleImage}
                                id="upload-image"
                              />
                            </>
                          ) : (
                            <div className="ImagePreview">
                              {/* <img
                                className="close-icon"
                                src={CloseIcon}
                                alt="CloseIcon"
                                onClick={() => {
                                  setIsUploaded(false);
                                  setImage(null);
                                }}
                              /> */}

                              <img
                                id="uploaded-image"
                                src={image}
                                draggable={false}
                                alt="uploaded-img"
                              />
                              <span
                                onClick={() => {
                                  setIsUploaded(false);
                                  setImage(null);
                                }}
                                className="img-txt"
                              >
                                Remove Photo
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-wrapper">
                      <input
                        type="text"
                        className="uk-input"
                        name="name"
                        onChange={handleChange}
                        value={inputData.name}
                        autoComplete="off"
                        required
                      />
                      <span class="span">Name</span>
                    </div>
                    <p className="errormsg mb-3">{formError.name}</p>
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
                    <div className="form-wrapper">
                      <input
                        type={passwordType}
                        className="uk-input"
                        name="password"
                        onChange={handleChange}
                        value={inputData.password}
                        autoComplete="off"
                        required
                      />
                      <span class="span">Password</span>
                      <span
                        className="toggle-password"
                        uk-toggle="target: .toggle"
                        onClick={showPassword}
                      >
                        <i className="toggle" uk-tooltip="Show Password">
                          <FaRegEyeSlash />
                        </i>
                        <i className="toggle" uk-tooltip="Hide Password" hidden>
                          <FaRegEye />
                        </i>
                      </span>
                    </div>
                    <p className="errormsg ">{formError.password}</p>
                    <button
                      className={`uk-button submit btn_1 full_width text-center ${
                        isSubmit ? "disable-cursor" : ""
                      }`}
                      onClick={handleSubmit}
                    >
                      {isSubmit ? (
                        <span>Please wait..</span>
                      ) : (
                        <span>Login</span>
                      )}
                    </button>
                  </form>
                </div>
                <p className="mt-3 text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="signUp">
                    Login
                  </Link>{" "}
                </p>
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
                <p className="mt-3 text-center">
                  {resend ? (
                    <span>Sending...</span>
                  ) : (
                    <span>
                      Didn't receive the code?{" "}
                      <span className="resend" onClick={handleResend}>
                        Resend
                      </span>
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
