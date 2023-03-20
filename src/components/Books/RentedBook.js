import React, { useContext, useEffect, useState,useRef } from "react";
import NavbarContext from "../context/navbar-context";
import { Fetchdata } from "../hooks/getData";
import Loading from "../Loading/Loading";
import { BsArrowUpRight } from "react-icons/bs";
import { Tabs, Tab } from "@mui/material";
import AuthContext from "../context/auth-context";
import AOS from "aos";
import "aos/dist/aos.css";
import search from "../../img/icon/icon_search.svg";

const RentedBook = () => {
  const { baseURL } = useContext(NavbarContext);
  const { UserDATA } = useContext(AuthContext);
  const [status, setStatus] = useState("-1");

  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchBook, setSearchBook] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    getBookData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // get book data-----------------------------------
  useEffect(() => {
    getBookData();
  }, [status]);

  const getBookData = () => {
    const dataForm = {
      FetchURL: `${baseURL}/api/getBook?UserID=${UserDATA.UserID}&Status=${status}`,
      Type: "GET",
    };

    Fetchdata(dataForm).then(function (result) {
      console.log("data", dataForm);
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : [];
        setSearchBook(postResult);
        setBookData(postResult);
        setLoading(false);
      } else {
        setBookData([]);
        setSearchBook([]);
        setLoading(false);
      }
    });
  };

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

  const handleChange = (event, newValue) => {
    setStatus(newValue);
  };

  const searchInput = useRef("");

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

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-lg-8">
            <div className="page_title_box pb-2 d-flex align-items-center justify-content-between">
              <div className="page_title_left">
                <h3 className="f_s_30 f_w_700 dark_text">Rented Books</h3>
              </div>
            </div>
            <div className="tabs pb-3">
              <Tabs
                value={status}
                onChange={handleChange}
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
          <div className="col-lg-4 d-flex justify-content-end">
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

        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              {bookData.length !== 0 ? (
                <>
                  <div className="row mt">
                    {bookData.map((props) => {
                      const { _id, BookName, Status, Image } = props;
                      return (
                        <div
                          className="col-md-3 col-sm-6 mt-2"
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
                <p>No books available</p>
              )}
            </>
          )}
        </>
      </div>
    </>
  );
};

export default RentedBook;
