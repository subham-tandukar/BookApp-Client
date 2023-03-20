import React, { useContext, useEffect, useRef, useState } from "react";
import search from "../../img/icon/icon_search.svg";
import businessman from "../../img/icon/businessman.svg";
import customer from "../../img/icon/customer.svg";
import sqr from "../../img/icon/sqr.svg";
import infographic from "../../img/icon/infographic.svg";
import placeholder from "../../img/placeholder.png";
import NavbarContext from "../context/navbar-context";
import { Fetchdata } from "../hooks/getData";
import Loading from "../Loading/Loading";

const Dashboard = () => {
  const { baseURL } = useContext(NavbarContext);

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

  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col-12">
          <div className="page_title_box d-flex flex-wrap align-items-center justify-content-between">
            <div className="page_title_left d-flex align-items-center">
              <h3 className="f_s_25 f_w_700 dark_text mr_30">Dashboard</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-7">
          <div className="white_card card_height_100 mb_30">
            <div className="white_card_header">
              <div className="row align-items-center uk-flex-wrap">
                <div className="col-sm-4">
                  <div className="main-title">
                    <h3 className="m-0">New Member</h3>
                  </div>
                </div>
                <div className="col-sm-8 dash-search">
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
                </div>
              </div>
            </div>
            <div className="white_card_body">
              {loading ? (
                <Loading />
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
              <div className="col-lg-6">
                <div className="single_crm">
                  <div className="crm_head d-flex align-items-center justify-content-between">
                    <div className="thumb">
                      <img src={businessman} alt="" />
                    </div>
                    <i className="fas fa-ellipsis-h f_s_11 white_text"></i>
                  </div>
                  <div className="crm_body">
                    <h4>{totalUsers}</h4>
                    <p>User Registrations</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="single_crm">
                  <div className="crm_head crm_bg_1 d-flex align-items-center justify-content-between">
                    <div className="thumb">
                      <img src={customer} alt="" />
                    </div>
                    <i className="fas fa-ellipsis-h f_s_11 white_text"></i>
                  </div>
                  <div className="crm_body">
                    <h4>{totalBooks}</h4>
                    <p>Total No. of Books</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="single_crm">
                  <div className="crm_head crm_bg_2 d-flex align-items-center justify-content-between">
                    <div className="thumb">
                      <img src={infographic} alt="" />
                    </div>
                    <i className="fas fa-ellipsis-h f_s_11 white_text"></i>
                  </div>
                  <div className="crm_body">
                    <h4>{booksAvailable}</h4>
                    <p>Books Available</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="single_crm">
                  <div className="crm_head crm_bg_3 d-flex align-items-center justify-content-between">
                    <div className="thumb">
                      <img src={sqr} alt="" />
                    </div>
                    <i className="fas fa-ellipsis-h f_s_11 white_text"></i>
                  </div>
                  <div className="crm_body">
                    <h4>{bookOut}</h4>
                    <p>Books Out</p>
                  </div>
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
