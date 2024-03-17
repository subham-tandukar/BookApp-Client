import React, { useContext, useEffect, useState, useRef } from "react";
import Loading from "../Loading/Loading";
import search from "../../img/icon/icon_search.svg";
import DeletePop from "../PopUp/DeletePop";
import AOS from "aos";
import "aos/dist/aos.css";
import BookContext from "../context/book context folder/bookContext";
import EditBook from "./EditBook";
import { BsArrowUpRight } from "react-icons/bs";
import GenreContext from "../context/genre context folder/genreContext";
import { Link } from "react-router-dom";
import Heading from "../Layout/Heading";

const Book = () => {
  const {
    isDelete,
    handleEdit,
    handleDelete,
    deleteBook,
    bookData,
    setBookData,
    searchBook,
    status,
    setStatus,
    bookLoading,
    getBookData,
    genre,
    setGenre,

    bulkDelete,
    setBulkDelete,
    bulkBook,
    setBulkBook,

    deleteBulkBook,
    handleBulkDelete,
    isBulkDelete,
    setIsBulkDelete,
  } = useContext(BookContext);
  console.log("deletedData", bulkBook);
  const { genreList } = useContext(GenreContext);

  const searchInput = useRef("");
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    getBookData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const searchHandler = (e) => {
    e.preventDefault();

    const srchQuery = searchInput.current.value.toLowerCase();
    if (srchQuery) {
      let srchResult = searchBook.filter((list) => {
        return list["BookName"].toLowerCase().includes(srchQuery);
      });

      if (srchResult) {
        setBookData(srchResult);
      } else {
        setBookData({});
      }
    } else {
      setBookData(searchBook);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleSelectBulkDelete = () => {
    if (bulkDelete) {
      setBulkDelete(false);
      setBulkBook([]);
    } else {
      setBulkDelete(true);
    }
  };

  const handleSelectBulkBook = (data) => {
    setBulkDelete(false);

    const hasBulkBook = bulkBook.find((book) => {
      return book === data._id;
    });
    if (hasBulkBook) {
      const filterBulkBook = bulkBook.filter(
        (book) => book !== hasBulkBook.toString()
      );
      setBulkBook(filterBulkBook);
    } else {
      setBulkBook([...bulkBook, data._id]);

      if (bookData.length === bulkBook.length + 1) {
        setBulkDelete(true);
      }
    }
  };

  return (
    <>
      <div className="container-fluid p-0">
        <Heading title="Books" />
        <div className="row align-items-center">
          <div className="col-md-8 ">
            <div className="custom-tabs">
              <div>
                <input
                  type="radio"
                  className="radio--button"
                  name="status"
                  id="allStatus"
                  onChange={(e) => setStatus(e.target.value)}
                  value="-1"
                  checked={status === "-1"}
                />
                <label className="label-radio px-3" htmlFor="allStatus">
                  All
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  className="radio--button"
                  name="status"
                  id="available"
                  onChange={(e) => setStatus(e.target.value)}
                  value="1"
                  checked={status === "1"}
                />
                <label className="label-radio px-3" htmlFor="available">
                  Available
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radio--button"
                  name="status"
                  id="out"
                  onChange={(e) => setStatus(e.target.value)}
                  value="2"
                  checked={status === "2"}
                />
                <label className="label-radio px-3" htmlFor="out">
                  Out
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <div className="serach_field-area theme_bg white_bg d-flex align-items-center">
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

        <div>
          <div className="page_title_box pb-1 d-flex align-items-center mt-3">
            <div className="page_title_left">
              <h5 className="f_s_30 f_w_700 dark_text">Categories</h5>
            </div>
          </div>
          <div className="tabs">
            <div
              className="genre-wrapper"
              value={genre}
              onChange={handleGenreChange}
            >
              <div className="genre-tab">
                <input
                  className="uk-input tab-input"
                  type="radio"
                  name="genre"
                  id="all"
                  value="-1"
                  checked={genre === "-1"}
                />
                <label htmlFor="all">All</label>
              </div>

              {genreList.length > 0 && (
                <>
                  {genreList.map((props) => {
                    const { _id, title, image } = props;
                    return (
                      <div className="genre-tab">
                        <input
                          className="uk-input tab-input"
                          type="radio"
                          name="genre"
                          id={_id}
                          value={title}
                        />
                        <label className="genre-label" htmlFor={_id}>
                          {title}
                        </label>
                        <img src={image.url} alt="" />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>

        <>
          {bookLoading ? (
            <Loading />
          ) : (
            <>
              {bookData.length !== 0 ? (
                <>
                  <div className="mb-2">
                    <div
                      className={`${
                        bulkBook.length > 0 && "active"
                      } bulk-delete-btn mb-3`}
                    >
                      <h5 className="mb-0" style={{ fontSize: "13px" }}>
                        Bulk Delete
                      </h5>
                      <button onClick={handleBulkDelete}>
                        Delete {bulkBook.length}{" "}
                        {bulkBook.length > 1 ? "books" : "book"}
                      </button>
                    </div>
                    <div className="checkbox__wrapper d-flex gap-2 align-item-center">
                      <input
                        checked={bulkDelete}
                        type="checkbox"
                        id="bulk-checkbox"
                        className="checkbox-hidden"
                        onChange={handleSelectBulkDelete}
                      />
                      <label
                        htmlFor="bulk-checkbox"
                        className="checkbox-visible"
                      ></label>
                      <p>{bulkDelete ? "Deselect All" : "Select All"}</p>
                    </div>
                  </div>
                  <div className="row" style={{ rowGap: "40px" }}>
                    {bookData.map((props) => {
                      const { _id, BookName, Status, Image } = props;
                      return (
                        <div
                          className="col-md-4 col-lg-3 col-sm-6 mt-2"
                          key={_id}
                          id={_id}
                          data-aos="zoom-in-up"
                        >
                          <div
                            className={`white_card position-relative mb_20 book-wrapper ${
                              bulkBook.includes(_id) ? "selectedBook" : ""
                            }`}
                          >
                            <div
                              className="checkbox__wrapper"
                              style={{ position: "absolute", margin: "10px" }}
                            >
                              <input
                                checked={bulkBook.includes(_id)}
                                type="checkbox"
                                id={`book${_id}`}
                                className="checkbox-hidden"
                                onChange={() => handleSelectBulkBook(props)}
                              />
                              <label
                                htmlFor={`book${_id}`}
                                className="checkbox-visible"
                              ></label>
                            </div>
                            <div className="card-body">
                              <div className="ribbon1 rib1-primary">
                                <span className="text-white text-center rib1-primary">
                                  {Status === "1" ? "Available" : "Out"}
                                </span>
                              </div>
                              <Link to={`/view-book/${_id}`}>
                                <img
                                  src={Image.url}
                                  alt="book img"
                                  className="d-block mx-auto my-4 book-img"
                                  height="150"
                                />
                                <div className="row my-4">
                                  <div className="col">
                                    <span className="f_w_400 color_text_3 f_s_14 d-block">
                                      {BookName}
                                    </span>
                                  </div>
                                </div>
                              </Link>

                              <div className="book_action_btns d-flex">
                                <span
                                  className="action_btn mr_10"
                                  uk-tooltip="Edit"
                                  onClick={() => handleEdit(props)}
                                >
                                  {" "}
                                  <i className="far fa-edit"></i>{" "}
                                </span>
                                <span
                                  className={`action_btn ${
                                    bulkBook.length > 0 ? "inactive" : ""
                                  }`}
                                  uk-tooltip="Delete"
                                  onClick={() => handleDelete(props)}
                                >
                                  {" "}
                                  <i className="fas fa-trash"></i>{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {showScrollToTop && (
                    <div className="uk-text-right">
                      <button
                        onClick={scrollToTop}
                        className="scroll-to-top-btn"
                        uk-tooltip="Go to top"
                      >
                        <BsArrowUpRight />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-3">No books available</p>
              )}
            </>
          )}
        </>
      </div>

      <DeletePop
        title={`${bulkBook.length > 0 ? bulkBook.length : ""} ${
          bulkBook.length > 1 ? "Books" : "Book"
        }`}
        handleDelete={bulkBook.length > 0 ? deleteBulkBook : deleteBook}
        loading={bulkBook.length > 0 ? isBulkDelete : isDelete}
      />
      <EditBook />
    </>
  );
};

export default Book;
