import React, { useEffect, useRef, useState, useContext } from "react";
import CloseIcon from "../../img/CloseIcon.svg";
import Plus from "../../img/Plus.png";
import { toast } from "react-toastify";
import $ from "jquery";
import { Fetchdata } from "../hooks/getData";
import NavbarContext from "../context/navbar-context";
import ConfirmPop from "../PopUp/ConfirmPop";
import Loading from "../Loading/Loading";
import BookContext from "../context/book context folder/bookContext";
import { MdOutlineAdd } from "react-icons/md";
import GenreContext from "../context/genre context folder/genreContext";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Heading from "../Layout/Heading";
import Select from "react-select";
import UploadWidget from "./UploadWidget";

const age = [
  {
    value: "4-8",
    label: "4-8",
  },
  {
    value: "9-12",
    label: "9-12",
  },
  {
    value: "13-19",
    label: "13-19",
  },
  {
    value: "20+",
    label: "20+",
  },
];
const lan = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "np",
    label: "Nepali",
  },
  {
    value: "tr",
    label: "Translated",
  },
];
const stat = [
  {
    value: "1",
    label: "Available",
  },
  {
    value: "2",
    label: "Unavailable",
  },
];

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const AddBook = () => {
  const { baseURL } = useContext(NavbarContext);
  const { genreList } = useContext(GenreContext);

  const {
    initialValue,
    formValue,
    setFormValue,
    formError,
    setFormError,
    isSubmit,
    setIsSubmit,
    image,
    setImage,
    isUploaded,
    setIsUploaded,
    getBookData,
    value,
    setValue,
    genreValue,
    setGenreValue,
  } = useContext(BookContext);

  const [loader, setLoader] = useState(false);
  const [confirmPop, setConfirmPop] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const numv = /^[0-9]+$/i;
    const digits = /^\d{10}$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.bookName) {
      errors.bookName = "Required";
    }
    if (!values.auther) {
      errors.auther = "Required";
    }
    if (values.page.length !== 0) {
      if (!numv.test(values.page)) {
        errors.page = "Must be digits";
      }
    }
    if (values.rating.length !== 0) {
      if (!numv.test(values.rating)) {
        errors.rating = "Must be digits";
      }
    }
    if (values.qty.length !== 0) {
      if (!numv.test(values.qty)) {
        errors.qty = "Must be digits";
      }
    }
    if (!values.status) {
      errors.status = "Required";
    }

    if (image === null) {
      errors.bookImg = "Required";
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
        FLAG: "I",
        UserID: formValue.userId,
        BookName: formValue.bookName,
        Auther: formValue.auther,
        AgeGroup: formValue.ageGrp,
        Page: formValue.page,
        Quantity: formValue.qty,
        Genre: genreValue,
        Status: formValue.status,
        Rating: formValue.rating ? formValue.rating : "0",
        Language: formValue.language,
        Description: value,
        Image: image,
        FetchURL: `${baseURL}/api/book`,
        Type: "POST",
      };
      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            setLoader(true);
            setTimeout(() => {
              setLoader(false);
              setConfirmPop(true);
              setIsSubmit(false);
              setFormValue(initialValue);
              setValue("");
              setIsUploaded(false);
              getBookData();
              setGenreValue([]);
              setImage(null);
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
  }, [formError]);

  useEffect(() => {
    if (confirmPop) {
      $(".confirmPopBg").fadeIn(500);
      $(".confirmPop").slideDown(500);
    }
  }, [confirmPop]);

  useEffect(() => {
    setIsSubmit(false);
    setFormValue(initialValue);
    setIsUploaded(false);
    setFormError({});
  }, []);

  //API to hit User list
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    userLst();
  }, []);

  const userLst = () => {
    const dataForm = {
      FLAG: "S",
      IsVerified: "Y",
      Type: "POST",
      FetchURL: `${baseURL}/api/user`,
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setUserList(postResult);
      } else {
        setUserList([]);
      }
    });
  };

  const dropDownValue = userList.map((item) => ({
    value: item._id,
    label: item.Name,
  }));

  const dropDownGenre = genreList.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  return (
    <>
      <div className="container-fluid p-0">
        <Heading title="Add New Book" />
        <div className="row my-form">
          <div className="col-12">
            <div className="white_card card_height_100 mb_30 cs_modal">
              <div className="white_card_body pt-4 modal-body">
                <form action="">
                  <div className="row wrapper">
                    <div className="col-lg-4 col-md-6">
                      <div className="mb_15">
                        <div className="form-wrapper">
                          <input
                            type="text"
                            className="uk-input"
                            name="bookName"
                            onChange={handleChange}
                            value={formValue.bookName}
                            autoComplete="off"
                            required
                          />
                          <span class="span">Book Name*</span>
                        </div>
                        {formError.bookName && (
                          <p className="errormsg">{formError.bookName}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb_15">
                        <div className="form-wrapper">
                          <input
                            type="text"
                            className="uk-input"
                            name="auther"
                            onChange={handleChange}
                            value={formValue.auther}
                            autoComplete="off"
                            required
                          />
                          <span class="span">Author*</span>
                        </div>
                        {formError.auther && (
                          <p className="errormsg">{formError.auther}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="common_input mb_15">
                        <div className="form-wrapper">
                          <select
                            className="uk-select"
                            name="ageGrp"
                            id=""
                            onChange={handleChange}
                            value={formValue.ageGrp}
                          >
                            {/* <option value="">Select Age Group</option> */}
                            {age.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <span class="span">Age Group</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className=" mb_15">
                        <div className="form-wrapper">
                          <input
                            type="text"
                            className="uk-input"
                            name="page"
                            onChange={handleChange}
                            value={formValue.page}
                            autoComplete="off"
                            required
                          />
                          <span class="span">Pages</span>
                        </div>
                        {formError.page && (
                          <p className="errormsg">{formError.page}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className=" mb_15">
                        <div className="form-wrapper">
                          <input
                            type="text"
                            className="uk-input"
                            name="rating"
                            onChange={handleChange}
                            value={formValue.rating}
                            autoComplete="off"
                            required
                          />
                          <span class="span">Ratings</span>
                        </div>
                        {formError.rating && (
                          <p className="errormsg">{formError.rating}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className=" mb_15">
                        <div className="form-wrapper">
                          <select
                            className="uk-select"
                            name="language"
                            id=""
                            onChange={handleChange}
                            value={formValue.language}
                          >
                            {/* <option value="">Select Age Group</option> */}
                            {lan.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <span class="span">Language</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className=" mb_15">
                        <div className="form-wrapper">
                          <input
                            type="text"
                            className="uk-input"
                            name="qty"
                            onChange={handleChange}
                            value={formValue.qty}
                            autoComplete="off"
                            required
                          />
                          <span class="span">Quantity</span>
                        </div>
                        {formError.qty && (
                          <p className="errormsg">{formError.qty}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className=" mb_15">
                        <div className="form-wrapper">
                          <select
                            className="uk-select"
                            name="userId"
                            id=""
                            onChange={handleChange}
                            value={formValue.userId}
                          >
                            <option value="-1">HTDRNL</option>
                            {dropDownValue.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <span class="span">Select User</span>
                        </div>
                        {formError.userId && (
                          <p className="errormsg">{formError.userId}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className=" mb_15">
                        <div className="form-wrapper">
                          <select
                            className="uk-select"
                            name="status"
                            id=""
                            onChange={handleChange}
                            value={formValue.status}
                          >
                            {stat.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <span class="span">Status</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className=" mb_15 d-flex">
                        <div className="w-100 mulit-select">
                          <Select
                            className="select"
                            style={{ fontSize: "11px", marginBottom: "3px" }}
                            isMulti
                            options={dropDownGenre || []}
                            onChange={(item) =>
                              setGenreValue(
                                item.map((item) => ({
                                  _id: item.value,
                                  title: item.label,
                                }))
                              )
                            }
                          />
                          <span class="span">Select Genre</span>
                        </div>

                        <div>
                          <Link className="addBtn" to="/genre">
                            <MdOutlineAdd color="#fff" fontSize="1.5rem" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="box_header mt-3">
                      <div className="main-title">
                        <h3 className="m-0">Description</h3>
                      </div>
                    </div>
                    <div className="col-lg-12 mt-3">
                      <ReactQuill
                        modules={modules}
                        formats={formats}
                        value={value}
                        onChange={setValue}
                      />
                    </div>

                    <div className="box_header mt-4">
                      <div className="main-title">
                        <h3 className="m-0">Add Image*</h3>
                      </div>
                    </div>
                    <div className="col-lg-12 mt-3">
                      {/* <div className="BoxUpload">
                        <div className="image-upload">
                          {!isUploaded ? (
                            <>
                              <label htmlFor="upload-input">
                                <img
                                  src={Plus}
                                  draggable={"false"}
                                  alt="placeholder"
                                  style={{
                                    width: 90,
                                    height: 100,
                                    paddingTop: "10px",
                                  }}
                                />
                              </label>

                              <input
                                type="file"
                                name="bookImg"
                                accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                                onChange={handleImage}
                                id="upload-input"
                              />
                            </>
                          ) : (
                            <div className="ImagePreview">
                              <img
                                className="close-icon"
                                src={CloseIcon}
                                alt="CloseIcon"
                                onClick={() => {
                                  setIsUploaded(false);
                                  setImage(null);
                                }}
                              />

                              <img
                                id="uploaded-image"
                                src={image}
                                draggable={false}
                                alt="uploaded-img"
                              />
                            </div>
                          )}
                        </div>
                      </div> */}

                      <UploadWidget image={image} setImage={setImage} />
                      {formError.bookImg && (
                        <p className="errormsg">{formError.bookImg}</p>
                      )}
                    </div>
                    <div className="col-12">
                      <div className="create_report_btn mt_30">
                        <button
                          onClick={handleSubmit}
                          className={`btn_1 radius_btn d-block text-center px-5 w-auto ${
                            isSubmit ? "disable-cursor" : ""
                          }`}
                        >
                          {isSubmit ? "Adding ..." : "Add Book"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loader && <Loading title="Adding Books..." />}
      <ConfirmPop msg="Book added successfully !" link="/book" />
    </>
  );
};

export default AddBook;
