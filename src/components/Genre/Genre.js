import React, { useContext, useEffect, useRef } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import GenreContext from "../context/genre context folder/genreContext";
import CloseIcon from "../../img/CloseIcon.svg";
import Plus from "../../img/Plus.png";
import { toast } from "react-toastify";
import DeletePop from "../PopUp/DeletePop";
import { Fetchdata } from "../hooks/getData";
import NavbarContext from "../context/navbar-context";
import Loading from "../Loading/Loading";
import search from "../../img/icon/icon_search.svg";

const Genre = () => {
  const {
    genreList,
    setGenreList,
    originalList,
    initialValue,
    formValue,
    setFormValue,
    formError,
    setFormError,
    isSubmit,
    setIsSubmit,
    genreImage,
    setGenreImage,
    genreIsUploaded,
    setGenreIsUploaded,
    handleDelete,
    deleteGenre,
    isDelete,
    genreLst,
    loading,
    toggleBtn,
    setToggleBtn,
    isEditSubmit,
    setIsEditSubmit,
    handleEdit,
    perId,
  } = useContext(GenreContext);

  const { baseURL } = useContext(NavbarContext);

  //  to search -------
  const searchInput = useRef("");
  const searchHandler = (e) => {
    e.preventDefault();

    const srchQuery = searchInput.current.value.toLowerCase();
    if (srchQuery) {
      let srchResult = originalList.filter((list) => {
        return list["title"].toLowerCase().includes(srchQuery);
      });

      if (srchResult) {
        setGenreList(srchResult);
      } else {
        setGenreList({});
      }
    } else {
      setGenreList(originalList);
    }
  };

  // set image
  const handleGenreImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        setGenreImage(e.target.result);
        setGenreIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    setIsSubmit(false);
    setFormValue(initialValue);
    setGenreIsUploaded(false);
    setFormError({});
    setToggleBtn(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.genre) {
      errors.genre = "Required";
    }

    if (genreImage === null) {
      errors.genreImg = "Required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(formValue));
    setIsSubmit(true);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    setFormError(validate(formValue));
    setIsEditSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      const dataForm = {
        FLAG: "I",
        title: formValue.genre,
        image: genreImage,
        FetchURL: `${baseURL}/api/genre`,
        Type: "POST",
      };
      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            setIsSubmit(false);
            setFormValue(initialValue);
            setGenreIsUploaded(false);
            toast.success(result.Message, {
              theme: "light",
            });
            genreLst();
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
    if (Object.keys(formError).length === 0 && isEditSubmit) {
      const dataForm = {
        FLAG: "U",
        GenreID: perId,
        title: formValue.genre,
        image: genreImage,
        FetchURL: `${baseURL}/api/genre`,
        Type: "POST",
      };
      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            setIsEditSubmit(false);
            setToggleBtn(false);
            setFormValue(initialValue);
            setGenreIsUploaded(false);
            toast.success(result.Message, {
              theme: "light",
            });
            genreLst();
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

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12">
            <div className="white_card card_height_100 mb_30">
              <div className="white_card_header pb-0">
                <div className="box_header m-0">
                  <div className="main-title">
                    <h3 className="m-0 ">Add Genre</h3>
                  </div>
                </div>
              </div>
              <div className="white_card_body">
                <div className="row">
                  <div className="d-flex uk-flex-middle uk-flex-wrap uk-flex-between">
                    <div className=" d-flex uk-flex-middle uk-flex-wrap">
                      <div className="me-3 mt-3">
                        <div
                          className="BoxUpload"
                          style={{ width: "75px", height: "75px" }}
                        >
                          <div className="image-upload">
                            {!genreIsUploaded ? (
                              <>
                                <label htmlFor="upload-input" className="p-2">
                                  <img
                                    src={Plus}
                                    draggable={"false"}
                                    alt="placeholder"
                                    style={{
                                      width: 70,
                                      height: 55,
                                    }}
                                  />
                                </label>

                                <input
                                  type="file"
                                  name="genreImg"
                                  accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                                  onChange={handleGenreImage}
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
                                    setGenreIsUploaded(false);
                                    setGenreImage(null);
                                  }}
                                />

                                <img
                                  id="uploaded-image"
                                  src={genreImage}
                                  draggable={false}
                                  alt="uploaded-img"
                                  style={{ height: "55px" }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="errormsg">{formError.genreImg}</p>
                      </div>
                      <div className="me-3 mt-3">
                        <TextField
                          id="outlined-basic"
                          label="Genre*"
                          variant="outlined"
                          size="small"
                          name="genre"
                          onChange={handleChange}
                          value={formValue.genre}
                        />
                        <p className="errormsg">{formError.genre}</p>
                      </div>
                      <div className="me-3 mt-3">
                        {toggleBtn ? (
                          <div className="create_report_btn">
                            <button
                              onClick={handleUpdate}
                              className={`btn_1 radius_btn d-block text-center w-100 px-4 ${
                                isEditSubmit ? "disable-cursor" : ""
                              }`}
                            >
                              {isEditSubmit ? "Updating ..." : "Update"}
                            </button>
                          </div>
                        ) : (
                          <div className="create_report_btn">
                            <button
                              onClick={handleSubmit}
                              className={`btn_1 radius_btn d-block text-center w-100 px-4 ${
                                isSubmit ? "disable-cursor" : ""
                              }`}
                            >
                              {isSubmit ? "Adding ..." : "Add"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 d-flex justify-content-end mt-3">
                      <div className="serach_field-area theme_bg theme_bg d-flex align-items-center">
                        <div className="search_inner">
                          <div className="uk-position-relative">
                            <div className="search_field">
                              <input
                                type="text"
                                placeholder="Search"
                                onChange={searchHandler}
                                ref={searchInput}
                              />
                            </div>
                            <button type="submit">
                              <img src={search} alt="" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="white_card_body mt-3">
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    {genreList.length > 0 ? (
                      <>
                        {genreList.map((props) => {
                          const { _id, title, image } = props;
                          return (
                            <div
                              key={_id}
                              className="single_user_pil d-flex align-items-center justify-content-between"
                            >
                              <div className="user_pils_thumb d-flex align-items-center">
                                <div className="thumb_34 mr_15 mt-0">
                                  <img
                                    className="img-fluid radius_50"
                                    src={image.url}
                                    alt="image"
                                  />
                                </div>
                                <span className="f_s_14 f_w_400 text_color_11">
                                  {title}
                                </span>
                              </div>

                              <div className="action_btns d-flex">
                                <a
                                  href="#"
                                  onClick={() => handleEdit(props)}
                                  className="action_btn mr_10"
                                >
                                  {" "}
                                  <i className="far fa-edit"></i>{" "}
                                </a>
                                <a
                                  href="#"
                                  onClick={() => handleDelete(props)}
                                  className="action_btn"
                                >
                                  {" "}
                                  <i className="fas fa-trash"></i>{" "}
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <p className="text-center">No genre found.</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeletePop title="Genre" handleDelete={deleteGenre} loading={isDelete} />
    </>
  );
};

export default Genre;
