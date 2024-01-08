import React, { useContext, useState, useEffect } from "react";
import logo from "../../img/logo.png";
import img from "../../img/login.gif";
import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import NavbarContext from "../context/navbar-context";
import { Fetchdata } from "../hooks/getData";
import WelcomePage from "../WelcomePage";
import $ from "jquery";
import { Link } from "react-router-dom";
import Toast from "../Toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { baseURL } = useContext(NavbarContext);
  const [passwordType, setPasswordType] = useState("password");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let location = useLocation();
  const initialvalue = { email: "", password: "" };
  const [inputData, setInputData] = useState(initialvalue);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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

  //   login api-----------------------------------
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      const dataForm = {
        Email: inputData.email,
        Password: inputData.password,
        FetchURL: `${baseURL}/api/login`,
        Type: "POST",
      };

      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            const postResult = result.Login[0];
            toast.success("Login sucessful", {
              theme: "light",
            });

            setIsSubmit(false);

            localStorage.setItem("token", JSON.stringify(postResult));
            sessionStorage.setItem("token", JSON.stringify(postResult));
            login(postResult);
            navigate("/");
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

  useEffect(() => {
    if (loader) {
      $(".welcomePop").fadeIn(1000);
    }
  }, [loader]);

  const showPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return isLoggedIn ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <>
      <WelcomePage />
      <Toast />

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
            <div className="col-md-6">
              <h5>Hello !</h5>
              <h3 className="mb-3">Welcome to Login Page</h3>
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
                    {isSubmit ? <span>Loading ...</span> : <span>Log in</span>}
                  </button>
                </form>
              </div>
              <p className="mt-3 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="signUp">
                  Sign up
                </Link>{" "}
              </p>
              <p className="text-center">
                <Link to="/forgot-password" className="signUp">
                  Forgot password?
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
