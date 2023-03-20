import React, { useContext, useEffect, useState, useRef } from "react";
import NavbarContext from "../context/navbar-context";
import { Fetchdata } from "../hooks/getData";
import Loading from "../Loading/Loading";
import placeholder from "../../img/placeholder.png";
import { BsArrowUpRight } from "react-icons/bs";
import search from "../../img/icon/icon_search.svg";

const User = () => {
  const { baseURL } = useContext(NavbarContext);

  const [loading, setLoading] = useState(true);

  // get the user list-----------------------------------
  const [userList, setUserList] = useState([]);
  const [originalList, setOriginalList] = useState(null);

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
    <>
      <div className="white_card card_height_100 mb_30">
        <div className="white_card_header">
          <div className="row align-items-center uk-flex-wrap">
            <div className="col-sm-4">
              <div className="main-title">
                <h3 className="m-0">User List</h3>
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
                              alt="Profile"
                            />
                          </div>
                          <span className="f_s_14 f_w_400 text_color_11">
                            {Name}
                          </span>
                        </div>

                        <div className="action_btns d-flex">
                          <a href="#" className="action_btn mr_10">
                            {" "}
                            <i className="far fa-edit"></i>{" "}
                          </a>
                          <a href="#" className="action_btn">
                            {" "}
                            <i className="fas fa-trash"></i>{" "}
                          </a>
                        </div>
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
    </>
  );
};

export default User;
