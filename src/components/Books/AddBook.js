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
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import { MdOutlineAdd } from "react-icons/md";
import GenreContext from "../context/genre context folder/genreContext";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Heading from "../Layout/Heading";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
  } = useContext(BookContext);

  const [loader, setLoader] = useState(false);
  const [confirmPop, setConfirmPop] = useState(false);

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

  const handleOnChange = (event, newValue) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      genre: newValue,
    }));
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
        Genre: formValue.genre,
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

  return (
    <>
      <div className="container-fluid p-0">
        <Heading title="Add New Book" />
        <div className="row">
          <div className="col-12">
            <div className="white_card card_height_100 mb_30">
              <div className="white_card_body pt-4">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="common_input mb_15">
                      <TextField
                        id="outlined-basic"
                        label="Book Name*"
                        variant="outlined"
                        size="small"
                        name="bookName"
                        onChange={handleChange}
                        value={formValue.bookName}
                      />
                      <p className="errormsg">{formError.bookName}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="common_input mb_15">
                      <TextField
                        id="outlined-basic"
                        label="Author*"
                        variant="outlined"
                        size="small"
                        name="auther"
                        onChange={handleChange}
                        value={formValue.auther}
                      />
                      <p className="errormsg">{formError.auther}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="common_input mb_15">
                      <TextField
                        id="select"
                        select
                        label="Age Group"
                        name="ageGrp"
                        onChange={handleChange}
                        value={formValue.ageGrp}
                      >
                        {age.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="common_input mb_15">
                      <TextField
                        id="outlined-basic"
                        label="Pages"
                        type="number"
                        // InputLabelProps={{
                        //   shrink: true,
                        // }}
                        variant="outlined"
                        size="small"
                        name="page"
                        onChange={handleChange}
                        value={formValue.page}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="common_input mb_15">
                      <TextField
                        id="outlined-basic"
                        label="Rating"
                        type="number"
                        variant="outlined"
                        size="small"
                        name="rating"
                        onChange={handleChange}
                        value={formValue.rating}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="common_input mb_15">
                      <TextField
                        id="select"
                        select
                        label="Language"
                        name="language"
                        onChange={handleChange}
                        value={formValue.language}
                      >
                        {lan.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="common_input mb_15 d-flex">
                      <div className="w-100">
                        <Autocomplete
                          multiple
                          id="select"
                          options={genreList.length > 0 ? genreList : []}
                          name="genre"
                          value={formValue.genre}
                          onChange={handleOnChange}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.title || ""}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.title}
                            </li>
                          )}
                          // style={{ width: 500 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Genre" />
                          )}
                        />
                      </div>
                      <Link className="addBtn" to="/genre">
                        <MdOutlineAdd color="#fff" fontSize="1.5rem" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="common_input mb_15">
                      <TextField
                        id="outlined-basic"
                        label="Quantity"
                        type="number"
                        variant="outlined"
                        size="small"
                        name="qty"
                        onChange={handleChange}
                        value={formValue.qty}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="common_input mb_15">
                      <TextField
                        id="select"
                        select
                        label="Select User"
                        name="userId"
                        defaultValue="-1"
                        onChange={handleChange}
                        value={formValue.userId}
                      >
                        <MenuItem value="-1">HTDRNL</MenuItem>
                        {dropDownValue.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <p className="errormsg">{formError.userId}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="common_input mb_15">
                      <TextField
                        id="select"
                        select
                        label="Status*"
                        name="status"
                        onChange={handleChange}
                        value={formValue.status}
                      >
                        {stat.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <p className="errormsg">{formError.status}</p>
                    </div>
                  </div>

                  <div className="box_header mt-3">
                    <div className="main-title">
                      <h3 className="m-0">Description</h3>
                    </div>
                  </div>
                  <div className="col-lg-12 mt-3">
                    {/* <div className="common_input mb_15">
                      <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        onChange={handleChange}
                        value={formValue.description}
                      />
                    </div> */}

                    <ReactQuill
                      modules={modules}
                      formats={formats}
                      value={value}
                      onChange={setValue}
                    />
                  </div>

                  <div className="box_header mt-4">
                    <div className="main-title">
                      <h3 className="m-0">Add Image</h3>
                    </div>
                  </div>
                  <div className="col-lg-12 mt-3">
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
                  <div className="col-12">
                    <div className="create_report_btn mt_30">
                      <button
                        onClick={handleSubmit}
                        className={`btn_1 radius_btn d-block text-center w-100 ${
                          isSubmit ? "disable-cursor" : ""
                        }`}
                      >
                        {isSubmit ? "Adding ..." : "Add Book"}
                      </button>
                    </div>
                  </div>
                </div>
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
