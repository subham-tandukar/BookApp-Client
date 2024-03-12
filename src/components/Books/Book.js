import React, { useContext, useEffect, useState, useRef } from "react";
import Loading from "../Loading/Loading";
import { Tabs, Tab } from "@mui/material";
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
  } = useContext(BookContext);

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

  const handleStatusChange = (event, newValue) => {
    setStatus(newValue);
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  return (
    <>
      <div className="container-fluid p-0">
        <Heading title="Books" />
        <div className="row align-items-center">
          <div className="col-md-8 ">
            <div className="tabs ">
              <Tabs
                value={status}
                onChange={handleStatusChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab value="-1" label="All" />
                <Tab value="1" label="Available" />
                <Tab value="2" label="Out" />
              </Tabs>
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
          <div className="page_title_box pb-2 d-flex align-items-center">
            <div className="page_title_left">
              <h5 className="f_s_30 f_w_700 dark_text">Categories</h5>
            </div>
          </div>
          <div className="tabs pb-3">
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
                  <div className="row">
                    {bookData.map((props) => {
                      const { _id, BookName, Status, Image } = props;
                      return (
                        <div
                          className="col-md-4 col-lg-3 col-sm-6 mt-2"
                          key={_id}
                          id={_id}
                          data-aos="zoom-in-up"
                        >
                          <div className="white_card position-relative mb_20 book-wrapper">
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
                                  className="action_btn"
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

      <DeletePop title="Book" handleDelete={deleteBook} loading={isDelete} />
      <EditBook />
    </>
  );
};

export default Book;
