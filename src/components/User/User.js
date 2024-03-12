import React, { useContext, useEffect, useState, useRef } from "react";
import Loading from "../Loading/Loading";
import placeholder from "../../img/placeholder.png";
import { BsArrowUpRight } from "react-icons/bs";
import searchImg from "../../img/icon/icon_search.svg";
import { MdVerified } from "react-icons/md";
import DeletePop from "../PopUp/DeletePop";
import { timeAgo } from "../hooks/getTime";
import UserContext from "../context/user context folder/userContext";
import Heading from "../Layout/Heading";
const User = () => {
  const {
    loading,
    setLoading,
    sortby,
    setSortby,
    status,
    setStatus,
    searchValue,
    setSearchValue,
    search,
    setSearch,
    isSubmit,
    setIsSubmit,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalItems,
    setTotalItems,
    totalPages,
    setTotalPages,
    userList,
    setUserList,
    userLst,
    isDelete,
    handleDelete,
    deleteUser,
  } = useContext(UserContext);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };
  useEffect(() => {
    if (isSubmit) {
      setSearch(searchValue);
      setLoading(true);
    }
  }, [isSubmit]);

  const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (page === totalPages) {
      return page;
    } else {
      setPage(page + 1);
    }
    ScrollTop();
  };

  const handlePrev = () => {
    if (page === 1) {
      return page;
    } else {
      setPage(page - 1);
    }
    ScrollTop();
  };

  return (
    <>
      <Heading title="User List" />
      <div className="white_card card_height_100 mb_30">
        <div className="white_card_header">
          <div className="row align-items-center uk-flex-wrap">
            <div className="col-sm-8">
              <div className="d-flex gap-3">
                <div>
                  <h5 className="mb-0" style={{ fontSize: "13px" }}>
                    Sort By
                  </h5>
                  <select
                    name="sort"
                    id=""
                    className="uk-select"
                    style={{ minWidth: "180px" }}
                    value={sortby}
                    onChange={(e) => {
                      setSortby(e.target.value);
                      setPage(1);
                      setTotalItems(0);
                      setTotalPages(1);
                    }}
                  >
                    <option value="">Recently added</option>
                    <option value="login">Recently logged in</option>
                    <option value="name">Name</option>
                  </select>
                </div>
                <div>
                  <h5 className="mb-0" style={{ fontSize: "13px" }}>
                    Status
                  </h5>
                  <select
                    name="status"
                    id=""
                    className="uk-select"
                    style={{ minWidth: "180px" }}
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setPage(1);
                      setTotalItems(0);
                      setTotalPages(1);
                    }}
                  >
                    <option value="-1">All</option>
                    <option value="Y">Verified</option>
                    <option value="N">Unverified</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-sm-4 dash-search">
              <div className="row justify-content-end">
                <div className="col-lg-8 d-flex justify-content-end">
                  <div className="serach_field-area theme_bg d-flex align-items-center">
                    <div className="search_inner">
                      <form>
                        <div className="search_field">
                          <input
                            type="text"
                            placeholder="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                          />
                        </div>
                        <button type="submit" onClick={handleSearch}>
                          <img src={searchImg} alt="" />
                        </button>
                      </form>
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
                  <div className="user-table px-4">
                    <div className="sn text-center">
                      <h5>S.N.</h5>
                    </div>
                    <div className="users">
                      <h5>Users</h5>
                    </div>
                    <div className="last-loggedin text-center">
                      <h5>Last logged in</h5>
                    </div>
                    <div className="status text-center">
                      <h5>Status</h5>
                    </div>
                    <div className="action text-center">
                      <h5>Action</h5>
                    </div>
                  </div>
                  {userList.map((props, i) => {
                    const { _id, Name, Profile, Status, LastLoggedIn } = props;
                    return (
                      <div
                        key={_id}
                        className="user-table single_user_pil d-flex align-items-center justify-content-between"
                      >
                        <div className="sn text-center">
                          {(page - 1) * pageSize + i + 1}
                        </div>
                        <div className="users user_pils_thumb d-flex align-items-center">
                          <div className="thumb_34 mr_15 mt-0">
                            <img
                              className="img-fluid radius_50"
                              src={Profile.url}
                              alt="Profile"
                            />
                          </div>
                          <span className="f_s_14 f_w_400 text_color_11">
                            {Name}
                          </span>
                        </div>

                        <div className="last-loggedin text-center">
                          {LastLoggedIn ? (
                            <span
                              style={{ fontSize: "13px" }}
                              className="text-black-50"
                            >
                              {timeAgo(LastLoggedIn)}
                            </span>
                          ) : (
                            "-"
                          )}
                        </div>
                        <div className="status text-center">
                          {Status === "Verified" ? (
                            <span className="verified">
                              Verified
                              <MdVerified />
                            </span>
                          ) : Status === "Unverified" ? (
                            <span className="unverified">Unverified</span>
                          ) : (
                            "-"
                          )}
                        </div>

                        <div className="action action_btns d-flex justify-content-center">
                          {/* <a href="#" className="action_btn mr_10">
                            {" "}
                            <i className="far fa-edit"></i>{" "}
                          </a> */}
                          <div
                            className="action_btn"
                            onClick={() => handleDelete(props)}
                          >
                            {" "}
                            <i className="fas fa-trash"></i>{" "}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {pageSize < totalItems && (
                    <div className="d-flex align-items-center gap-4 justify-content-end">
                      <div className="d-flex align-items-center gap-2">
                        <select
                          name="pageSize"
                          id=""
                          className="uk-select pageSize"
                          style={{ minWidth: "50px", flex: "1" }}
                          onChange={(e) => {
                            setPageSize(e.target.value);
                            setPage(1);
                            setTotalItems(0);
                            ScrollTop();
                            setTotalPages(1);
                          }}
                          value={pageSize}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                          <option value="30">30</option>
                        </select>
                        <h5 className="mb-0" style={{ fontSize: "13px" }}>
                          Per page
                        </h5>
                      </div>
                      <div id="pagination">
                        <div className="pagination-item">
                          <div
                            onClick={handlePrev}
                            className={page === 1 && "inactive"}
                          >
                            <span class="">«</span>
                          </div>
                        </div>
                        {/* Display pagination numbers */}

                        {Array.from(
                          { length: totalPages },
                          (_, index) => index + 1
                        ).map((pageNumber) => (
                          <div
                            className="pagination-item"
                            key={pageNumber}
                            onClick={() => {
                              setPage(pageNumber);
                              ScrollTop();
                            }}
                          >
                            <span
                              className={pageNumber === page ? "active" : ""}
                            >
                              {pageNumber}
                            </span>
                          </div>
                        ))}

                        <div className="pagination-item">
                          <div
                            onClick={handleNext}
                            className={page === totalPages && "inactive"}
                          >
                            <span>»</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center">No user found.</p>
              )}
            </>
          )}
        </div>
      </div>

      <DeletePop title="User" handleDelete={deleteUser} loading={isDelete} />
    </>
  );
};

export default User;
