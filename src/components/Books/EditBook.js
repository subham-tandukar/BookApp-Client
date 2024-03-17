import React, { useContext, useState, useEffect } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import BookContext from "../context/book context folder/bookContext";
import NavbarContext from "../context/navbar-context";
import { Fetchdata } from "../hooks/getData";
import CloseIcon from "../../img/CloseIcon.svg";
import Plus from "../../img/Plus.png";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import GenreContext from "../context/genre context folder/genreContext";
import { MdOutlineAdd } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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

const EditBook = () => {
  const { baseURL } = useContext(NavbarContext);
  const { genreList } = useContext(GenreContext);
  const {
    formValue,
    setFormValue,
    formError,
    setFormError,
    isEditSubmit,
    setIsEditSubmit,
    image,
    setImage,
    isUploaded,
    setIsUploaded,
    initialValue,
    perId,
    getBookData,
    value,
    setValue,
    genreValue,
    setGenreValue,
  } = useContext(BookContext);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const numv = /^[0-9]+$/i;

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
    setIsEditSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isEditSubmit) {
      const dataForm = {
        FLAG: "U",
        BookID: perId,
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
        Description: formValue.description,
        Image: image,
        FetchURL: `${baseURL}/api/book`,
        Type: "POST",
      };
      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            setLoader(true);
            setTimeout(() => {
              toast.success(result.Message, {
                theme: "light",
              });
              setLoader(false);
              $(".editPopBg").fadeOut(300);
              $(".editPop").slideUp(500);
              setFormValue(initialValue);
              setFormError({});
              setIsEditSubmit(false);
              getBookData();
              setGenreValue([]);
              setImage(null);
            }, 1000);
          } else {
            toast.error(result.Message, {
              theme: "light",
            });
            setIsEditSubmit(false);
          }
        })
        .catch((result) => {
          setIsEditSubmit(false);
        });
    } else {
      setIsEditSubmit(false);
    }
  }, [formError]);

  //API to hit User list
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    userLst();
  }, []);

  const userLst = () => {
    const dataForm = {
      FLAG: "S",
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
  const handleClose = () => {
    $(".editPopBg").fadeOut(300);
    $(".editPop").slideUp(500);
    setFormValue(initialValue);
    setFormError({});
    setIsEditSubmit(false);
    setIsUploaded(false);
  };
  const dropDownValue = userList.map((item) => ({
    value: item._id,
    label: item.Name,
  }));

  const dropDownGenre = genreList.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  const defaultGenre = genreValue.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  return (
    <>
      <section className="popup-bg editPopBg my-form">
        <div className="popup editPop">
          <div className="popup-head">
            <h4>Edit Book</h4>
            <div className="close" onClick={handleClose}>
              <GrFormClose size="2rem" color="#fff" />
            </div>
          </div>

          <div className="popup-body editPopBody cs_modal">
            <div className="white_card_body modal-body">
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
                        value={defaultGenre || []}
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
              </div>
            </div>
          </div>
          <div className="popup-footer">
            <button
              className={`uk-button ${isEditSubmit ? "disable-cursor" : ""}`}
              onClick={handleSubmit}
            >
              {isEditSubmit ? "Updating..." : "Update"}
            </button>
            <button className="uk-button cancel-btn" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </section>
      {loader && <Loading title="Updating Books..." />}
    </>
  );
};

export default EditBook;
