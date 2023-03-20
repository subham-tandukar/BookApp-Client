import React, { useEffect, useRef, useState, useContext } from "react";
import { toast } from "react-toastify";
import $ from "jquery";
import { Fetchdata } from "../hooks/getData";
import NavbarContext from "../context/navbar-context";
import Toast from "../Toast";
import ConfirmPop from "../PopUp/ConfirmPop";
import Loading from "../Loading/Loading";

const AddUser = () => {
  const { baseURL } = useContext(NavbarContext);

  const initialValue = {
    name: "",
    email: "",
    password: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loader, setLoader] = useState(false);
  const [confirmPop, setConfirmPop] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(formValue));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      const dataForm = {
        Name: formValue.name,
        Email: formValue.email,
        Password: formValue.password,
        FLAG: "I",
        FetchURL: `${baseURL}/api/user`,
        Type: "POST",
      };
      Fetchdata(dataForm).then(function (result) {
        if (result.StatusCode === 200) {
          setLoader(true);
          setTimeout(() => {
            setLoader(false);
            setConfirmPop(true);
          }, 1000);
        } else {
          toast.error(result.Message, {
            theme: "light",
          });
        }
      });
      setIsSubmit(false);
    }
  }, [formError]);

  useEffect(() => {
    if (confirmPop) {
      $(".confirmPopBg").fadeIn(500);
      $(".confirmPop").slideDown(500);
    }
  }, [confirmPop]);

  return (
    <>
      <Toast />
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12">
            <div className="white_card card_height_100 mb_30">
              <div className="white_card_header">
                <div className="box_header m-0">
                  <div className="main-title">
                    <h3 className="m-0">Add New User</h3>
                  </div>
                </div>
              </div>
              <div className="white_card_body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="common_input mb_15">
                      <input
                        type="text"
                        placeholder="Name*"
                        name="name"
                        onChange={handleChange}
                        value={formValue.name}
                      />
                      <p className="errormsg">{formError.name}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="common_input mb_15">
                      <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={formValue.email}
                        placeholder="Email*"
                      />
                      <p className="errormsg">{formError.email}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="common_input mb_15">
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formValue.password}
                        placeholder="Password*"
                      />
                      <p className="errormsg">{formError.password}</p>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="create_report_btn mt_30">
                      <button
                        onClick={handleSubmit}
                        className="btn_1 radius_btn d-block text-center w-100"
                      >
                        Add User
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loader && <Loading title="Adding User..." />}
      <ConfirmPop msg="User added successfully !" link="/user" />
    </>
  );
};

export default AddUser;
