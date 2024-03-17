import React, { useContext, useEffect, useState, useRef } from "react";
import Loading from "../Loading/Loading";
import placeholder from "../../img/placeholder.png";
import { BsArrowUpRight } from "react-icons/bs";
import searchImg from "../../img/icon/icon_search.svg";
import { MdVerified, MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import DeletePop from "../PopUp/DeletePop";
import { timeAgo } from "../hooks/getTime";
import UserContext from "../context/user context folder/userContext";
import Heading from "../Layout/Heading";
import AuthContext from "../context/auth-context";

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
    showLast,
    setShowLast,
    bulkDelete,
    setBulkDelete,
    bulkUsers,
    setBulkUsers,
    selectedAllUserIds,
    deleteBulkUser,
    handleBulkDelete,
    isBulkDelete,
  } = useContext(UserContext);
  const { UserDATA } = useContext(AuthContext);

  const handleSearch = (e) => {
    e.preventDefault();
    // setIsSubmit(true);
  };
  // useEffect(() => {
  //   if (isSubmit) {
  //     setSearch(searchValue);
  //     setLoading(true);
  //   }
  // }, [isSubmit]);

  const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (page === totalPages) {
      return page;
    } else {
      setPage(page + 1);
    }
    // ScrollTop();
  };

  const handlePrev = () => {
    if (page === 1) {
      return page;
    } else {
      setPage(page - 1);
    }
    // ScrollTop();
  };

  const handleSelectBulkDelete = () => {
    if (bulkDelete) {
      setBulkDelete(false);
      setBulkUsers([]);
    } else {
      setBulkDelete(true);
    }
  };

  const handleSelectBulkUsers = (data) => {
    setBulkDelete(false);

    const hasBulkUsers = bulkUsers.find((user) => {
      return user === data._id;
    });
    if (hasBulkUsers) {
      const filterBulkUsers = bulkUsers.filter(
        (user) => user !== hasBulkUsers.toString()
      );
      setBulkUsers(filterBulkUsers);
    } else {
      setBulkUsers([...bulkUsers, data._id]);

      if (totalItems === bulkUsers.length + 1) {
        setBulkDelete(true);
      }
    }
  };

  return (
    <>
      <Heading title="User List" />
      <div className="white_card card_height_100 mb_30">
        <div className="white_card_header">
          <div className="row align-items-center uk-flex-wrap">
            <div className="col-sm-8">
              <div className="d-flex flex-wrap gap-3">
                <div>
                  <div
                    className={`${
                      bulkUsers.length > 0 && "active"
                    } bulk-delete-btn`}
                  >
                    <h5 className="mb-0" style={{ fontSize: "13px" }}>
                      Bulk Delete
                    </h5>
                    <button onClick={handleBulkDelete}>
                      Delete {bulkUsers.length}{" "}
                      {bulkUsers.length > 1 ? "users" : "user"}
                    </button>
                  </div>
                </div>
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
                      // if (!bulkDelete) {
                      //   setBulkUsers([]);
                      // }
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
                      // if (!bulkDelete) {
                      //   setBulkUsers([]);
                      // }
                    }}
                  >
                    <option value="-1">All</option>
                    <option value="Y">Verified</option>
                    <option value="N">Unverified</option>
                  </select>
                </div>
                <div>
                  <h5 className="mb-0" style={{ fontSize: "13px" }}>
                    Show entries
                  </h5>
                  <select
                    name="pageSize"
                    id=""
                    className="uk-select "
                    style={{ minWidth: "50px" }}
                    onChange={(e) => {
                      setPageSize(e.target.value);
                      setPage(1);
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
                            value={search}
                            onChange={(e) => {
                              setSearch(e.target.value);
                              setPage(1);
                            }}
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
                  <div className="table__layout">
                    <div className="user-table px-4">
                      <div className="table__checkbox bulk__delete">
                        <div className="checkbox__wrapper">
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
                        </div>
                      </div>
                      <div className="sn text-center">
                        <h5>S.N.</h5>
                      </div>
                      <div
                        className="users table-icon"
                        onClick={() => setShowLast(!showLast)}
                      >
                        <h5>Users </h5>
                        <div className="filter-icon">
                          <div
                            className={`filter-up ${
                              showLast === false && "active"
                            }`}
                          >
                            <MdArrowDropUp />
                          </div>
                          <div
                            className={`filter-down ${
                              showLast === true && "active"
                            }`}
                          >
                            <MdArrowDropDown />
                          </div>
                        </div>
                      </div>
                      <div className="email">
                        <h5>Email</h5>
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
                      const {
                        _id,
                        Name,
                        Email,
                        Profile,
                        Status,
                        LastLoggedIn,
                      } = props;
                      return (
                        <div
                          key={_id}
                          className="user-table single_user_pil d-flex align-items-center justify-content-between"
                        >
                          <div className="table__checkbox">
                            <div className="checkbox__wrapper">
                              <input
                                checked={bulkUsers.includes(_id)}
                                type="checkbox"
                                id={_id}
                                className="checkbox-hidden"
                                onChange={() => handleSelectBulkUsers(props)}
                              />
                              <label
                                htmlFor={_id}
                                className="checkbox-visible"
                              ></label>
                            </div>
                          </div>
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
                            {UserDATA.UserID === _id && (
                              <span className="own">You</span>
                            )}
                          </div>

                          <div className="text-start email">
                            <span className="f_s_14 f_w_400  text_color_11">
                              {Email}
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
                              className={`action_btn ${
                                bulkUsers.length > 0 ? "inactive" : ""
                              }`}
                              onClick={() => handleDelete(props)}
                            >
                              {" "}
                              <i className="fas fa-trash"></i>{" "}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="d-flex align-items-center gap-4 justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <div>
                        <h5 className="mb-0" style={{ fontSize: "13px" }}>
                          Showing{" "}
                          {(page - 1) * pageSize + 1 ===
                          (page - 1) * pageSize + userList.length ? (
                            ""
                          ) : (
                            <>
                              <strong>{(page - 1) * pageSize + 1}</strong> to{" "}
                            </>
                          )}
                          <strong>
                            {(page - 1) * pageSize + userList.length}
                          </strong>{" "}
                          of <strong>{totalItems}</strong> results
                        </h5>
                      </div>
                    </div>

                    {pageSize < totalItems && (
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
                        ).map((pageNumber) => {
                          if (
                            pageNumber === 1 || // Display the first page number
                            pageNumber === totalPages || // Display the last page number
                            (pageNumber >= page - 1 && pageNumber <= page + 1) // Display the range around the current page
                          ) {
                            return (
                              <div
                                className="pagination-item"
                                key={pageNumber}
                                onClick={() => {
                                  setPage(pageNumber);
                                  // ScrollTop();
                                }}
                              >
                                <span
                                  className={
                                    pageNumber === page ? "active" : ""
                                  }
                                >
                                  {pageNumber}
                                </span>
                              </div>
                            );
                          } else if (
                            pageNumber === 2 &&
                            page > 2 // Display the dot after the first page if necessary
                          ) {
                            return (
                              <div
                                className="pagination-item dots"
                                key={pageNumber}
                              >
                                <span>...</span>
                              </div>
                            );
                          } else if (
                            pageNumber === totalPages - 1 &&
                            page < totalPages - 1 // Display the dot before the last page if necessary
                          ) {
                            return (
                              <div
                                className="pagination-item dots"
                                key={pageNumber}
                              >
                                <span>...</span>
                              </div>
                            );
                          }
                          return null; // Return null for pages not meeting any condition
                        })}

                        <div className="pagination-item">
                          <div
                            onClick={handleNext}
                            className={page === totalPages && "inactive"}
                          >
                            <span>»</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-center">No user found.</p>
              )}
            </>
          )}
        </div>
      </div>

      <DeletePop
        title={`${bulkUsers.length > 0 ? bulkUsers.length : ""} ${
          bulkUsers.length > 1 ? "Users" : "User"
        }`}
        handleDelete={bulkUsers.length > 0 ? deleteBulkUser : deleteUser}
        loading={bulkUsers.length > 0 ? isBulkDelete : isDelete}
      />
    </>
  );
};

export default User;
