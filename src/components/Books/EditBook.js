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
import Toast from "../Toast";

const EditBook = () => {
  const { baseURL } = useContext(NavbarContext);
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
  } = useContext(BookContext);
  const [loader, setLoader] = useState(false);

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
    setFormValue({ ...formValue, [name]: value });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.bookName) {
      errors.bookName = "Required";
    }
    if (!values.auther) {
      errors.auther = "Required";
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
        WordCount: formValue.wordCount,
        Edition: formValue.edition,
        YearPublished: formValue.yrPub,
        Quantity: formValue.qty,
        Genre: formValue.genre,
        Status: formValue.status,
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
            }, 1000);
          } else {
            toast.error(result.Message.name, {
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
  return (
    <>
      <Toast />
      <section className="popup-bg editPopBg">
        <div className="popup editPop">
          <div className="popup-head">
            <h4>Edit Book</h4>
            <div className="close" onClick={handleClose}>
              <GrFormClose size="2rem" color="#fff" />
            </div>
          </div>

          <div className="popup-body editPopBody">
            <div className="white_card_body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="common_input mb_15">
                    <label>Book Name*</label>
                    <input
                      type="text"
                      placeholder="Book Name*"
                      name="bookName"
                      onChange={handleChange}
                      value={formValue.bookName}
                    />
                    <p className="errormsg">{formError.bookName}</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="common_input mb_15">
                    <label>Author*</label>
                    <input
                      type="text"
                      name="auther"
                      onChange={handleChange}
                      value={formValue.auther}
                      placeholder="Author*"
                    />
                    <p className="errormsg">{formError.auther}</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="common_input mb_15">
                    <label>Age Group</label>
                    <select
                      className="nice_Select2 nice_Select_line wide w-100"
                      // ref={selectRef}
                      name="ageGrp"
                      onChange={handleChange}
                      value={formValue.ageGrp}
                    >
                      <option value="0">Age Group</option>
                      <option value="1">4-8</option>
                      <option value="2">9-12</option>
                      <option value="3">13-19</option>
                      <option value="4">20+</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="common_input mb_15">
                    <label>Pages</label>
                    <input
                      type="number"
                      name="page"
                      onChange={handleChange}
                      value={formValue.page}
                      placeholder="Pages"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="common_input mb_15">
                    <label>Word Count</label>
                    <input
                      type="number"
                      name="wordCount"
                      onChange={handleChange}
                      value={formValue.wordCount}
                      placeholder="Word Count"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="common_input mb_15">
                    <label>Edition</label>
                    <input
                      type="number"
                      name="edition"
                      onChange={handleChange}
                      value={formValue.edition}
                      placeholder="Edition"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="common_input mb_15">
                    <label>Year Published</label>
                    <input
                      type="number"
                      name="yrPub"
                      onChange={handleChange}
                      value={formValue.yrPub}
                      placeholder="Year Published"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="common_input mb_15">
                    <label>Quantity</label>
                    <input
                      type="number"
                      name="qty"
                      onChange={handleChange}
                      value={formValue.qty}
                      placeholder="Quantity"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="common_input mb_15">
                    <label>Genre</label>
                    <input
                      type="text"
                      name="genre"
                      onChange={handleChange}
                      value={formValue.genre}
                      placeholder="Genre"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="common_input mb_15">
                    <label>Status*</label>
                    <select
                      className="nice_Select2 nice_Select_line wide  w-100"
                      // ref={selectRef}
                      name="status"
                      onChange={handleChange}
                      value={formValue.status}
                    >
                      <option value="0">Status*</option>
                      <option value="1">Available</option>
                      <option value="2">Unavailable</option>
                    </select>
                    <p className="errormsg">{formError.status}</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="common_input mb_15">
                    <label>Description</label>
                    <textarea
                      id="description"
                      value={formValue.description}
                      placeholder="Description"
                      onChange={handleChange}
                      name="description"
                      rows="1"
                      cols="12"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-6">
                  <label>Select User</label>
                  <select
                    className="nice_Select2 nice_Select_line wide mb_15 w-100"
                    name="userId"
                    onChange={handleChange}
                    value={formValue.userId}
                  >
                    <option disabled value="0" selected>
                      Select User
                    </option>
                    <option value="">HTDRNL</option>
                    {userList.map((list) => {
                      return (
                        <option key={list._id} value={list._id}>
                          {list.Name}
                        </option>
                      );
                    })}
                  </select>
                  <p className="errormsg">{formError.userId}</p>
                </div>

                <div className="box_header mt-3">
                  <div className="main-title">
                    <h3 className="m-0">Add Image</h3>
                  </div>
                </div>
                <div className="col-lg-12 mt-4">
                  <div className="BoxUpload">
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
                  </div>
                  <p className="errormsg">{formError.bookImg}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="popup-footer">
            <button className="uk-button" onClick={handleSubmit}>
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
