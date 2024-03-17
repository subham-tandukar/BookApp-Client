import React, { useContext, useEffect, useRef, useState } from "react";
import search from "../../img/icon/icon_search.svg";
import businessman from "../../img/icon/businessman.svg";
import customer from "../../img/icon/customer.svg";
import sqr from "../../img/icon/sqr.svg";
import infographic from "../../img/icon/infographic.svg";
import clock from "../../img/clock.gif";
import NavbarContext from "../context/navbar-context";
import { Fetchdata } from "../hooks/getData";
import Loading from "../Loading/Loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import BookContext from "../context/book context folder/bookContext";
import Heading from "../Layout/Heading";
import AuthContext from "../context/auth-context";

const Dashboard = () => {
  const { baseURL } = useContext(NavbarContext);
  const { setStatus } = useContext(BookContext);
  const { UserDATA } = useContext(AuthContext);

  // get the count-----------------------------------
  const [count, setCount] = useState([]);
  useEffect(() => {
    countList();
  }, []);

  const countList = () => {
    const dataForm = {
      FetchURL: `${baseURL}/api/count`,
      Type: "GET",
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values[0] ? result.Values[0] : [];
        setCount(postResult);
      } else {
        setCount([]);
      }
    });
  };

  const totalBooks = count.TotalBooks;
  const booksAvailable = count.BooksAvailable;
  const bookOut = count.BookOut;
  const totalUsers = count.TotalUsers;

  // get the user list-----------------------------------
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalList, setOriginalList] = useState(null);
  useEffect(() => {
    userlst();
  }, []);

  const userlst = () => {
    const dataForm = {
      FetchURL: `${baseURL}/api/getNewUser`,
      Type: "GET",
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : [];

        setUserList(postResult);
        setOriginalList(postResult);

        setLoading(false);
      } else {
        setUserList([]);
        setOriginalList([]);
        setLoading(false);
      }
    });
  };

  //  to search -------
  const searchInput = useRef("");
  const searchHandler = (e) => {
    e.preventDefault();

    const srchQuery = searchInput.current.value.toLowerCase();
    if (srchQuery) {
      let srchResult = originalList.filter((list) => {
        return list["Name"].toLowerCase().includes(srchQuery);
      });

      if (srchResult) {
        setUserList(srchResult);
      } else {
        setUserList({});
      }
    } else {
      setUserList(originalList);
    }
  };
  // Create an array with 5 elements (can be any value, e.g., null)
  const mySkeleton = Array.from({ length: 5 }, (_, index) => index);
  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col-12">
          <Heading title="Dashboard" />
        </div>
      </div>
      <div className="row">
        <div className="col-xl-7">
          <div className="white_card card_height_100 mb_30">
            <div className="white_card_header">
              <div className="row align-items-center uk-flex-wrap">
                {/* <div className="col-sm-4"> */}
                <div className="main-title">
                  <h3 className="m-0">New Members</h3>
                </div>
                {/* </div> */}
                {/* <div className="col-sm-8 dash-search">
                  <div className="row justify-content-end">
                    <div className="col-lg-8 d-flex justify-content-end">
                      <div className="serach_field-area theme_bg d-flex align-items-center">
                        <div className="search_inner">
                          <div>
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
                </div> */}
              </div>
            </div>
            <div className="white_card_body">
              {loading ? (
                // <Loading />
                <>
                  {mySkeleton.map((_, index) => (
                    <div
                      key={index}
                      className="single_user_pil py-2 d-flex align-items-center justify-content-between"
                    >
                      <div className="user_pils_thumb d-flex  flex-grow-1">
                        <div className="thumb_34 mr_15 mt-0 ">
                          <Skeleton
                            className="my-skeleton"
                            height={30}
                            width={30}
                            circle={true}
                          />
                        </div>
                        <span className="f_s_14 f_w_400 text_color_11 w-100">
                          <Skeleton className="my-skeleton" height={30} />
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {userList.length > 0 ? (
                    <>
                      {userList.map((props) => {
                        const { _id, Name, Profile } = props;
                        return (
                          <div
                            key={_id}
                            className="single_user_pil d-flex align-items-center justify-content-between"
                          >
                            <div className="user_pils_thumb d-flex align-items-center">
                              <div className="thumb_34 mr_15 mt-0">
                                <img
                                  className="img-fluid radius_50"
                                  src={Profile.url}
                                  alt="profile"
                                />
                              </div>
                              <span className="f_s_14 f_w_400 text_color_11">
                                {Name}
                              </span>
                              {UserDATA.UserID === _id && (
                                <span className="own">You</span>
                              )}
                            </div>

                            {/* <div className="action_btns d-flex">
                          <a href="#" className="action_btn mr_10">
                            {" "}
                            <i className="far fa-edit"></i>{" "}
                          </a>
                          <a href="#" className="action_btn">
                            {" "}
                            <i className="fas fa-trash"></i>{" "}
                          </a>
                        </div> */}
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <p className="text-center">No user found.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-xl-5 mt-3 mt-xl-0">
          <div className="white_card card_height_100 mb_30 user_crm_wrapper">
            <div className="row">
              <div className="col-lg-6 col-sm-6">
                <div className="single_crm user-box">
                  <Link to="/user">
                    <div className="crm_head d-flex align-items-center justify-content-between">
                      <div className="thumb">
                        <img src={businessman} alt="" />
                      </div>
                      <i className="fas fa-ellipsis-h f_s_11 white_text"></i>
                    </div>
                    <div className="crm_body">
                      <h4>{totalUsers >= 0 ? totalUsers : "..."}</h4>
                      <p>
                        User {totalUsers > 1 ? "Registrations" : "Registration"}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="single_crm total-book-box">
                  <Link to="/book" onClick={() => setStatus("-1")}>
                    <div className="crm_head crm_bg_1 d-flex align-items-center justify-content-between">
                      <div className="thumb">
                        <img src={customer} alt="" />
                      </div>
                      <i className="fas fa-ellipsis-h f_s_11 white_text"></i>
                    </div>
                    <div className="crm_body">
                      <h4>{totalBooks >= 0 ? totalBooks : "..."}</h4>
                      <p>Total No. of {totalBooks > 1 ? "Books" : "Book"}</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div
                  className="single_crm available-book-box"
                  onClick={() => setStatus("1")}
                >
                  <Link to="/book">
                    <div className="crm_head crm_bg_2 d-flex align-items-center justify-content-between">
                      <div className="thumb">
                        <img src={infographic} alt="" />
                      </div>
                      <i className="fas fa-ellipsis-h f_s_11 white_text"></i>
                    </div>
                    <div className="crm_body">
                      <h4>{booksAvailable >= 0 ? booksAvailable : "..."}</h4>
                      <p>{booksAvailable > 1 ? "Books" : "Book"} Available</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="single_crm no-book-box">
                  <Link to="/book" onClick={() => setStatus("2")}>
                    <div className="crm_head crm_bg_3 d-flex align-items-center justify-content-between">
                      <div className="thumb">
                        <img src={sqr} alt="" />
                      </div>
                      <i className="fas fa-ellipsis-h f_s_11 white_text"></i>
                    </div>
                    <div className="crm_body">
                      <h4>{bookOut >= 0 ? bookOut : "..."}</h4>
                      <p>{bookOut > 1 ? "Books" : "Book"} Out</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
