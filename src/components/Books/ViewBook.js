import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Fetchdata } from "../hooks/getData";
import NavbarContext from "../context/navbar-context";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Loading from "../Loading/Loading";
import RatingStar from "./Rating";

const ViewBook = () => {
  const { baseURL } = useContext(NavbarContext);

  const { id } = useParams();

  const [bookLoading, setBookLoading] = useState(true);

  // to get book info
  const [bookInfo, setBookInfo] = useState([]);
  useEffect(() => {
    infoList();
  }, []);

  const infoList = () => {
    const dataForm = {
      BookID: id,
      FLAG: "SI",
      FetchURL: `${baseURL}/api/book`,
      Type: "POST",
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const data = result.Values ? result.Values : "";
        setBookInfo(data);
        setBookLoading(false);
      } else {
        setBookInfo([]);
        setBookLoading(false);
      }
    });
  };

  return (
    <>
      {bookLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-md-8 ">
              <div className="page_title_box pb-2 d-flex align-items-center justify-content-between">
                <div className="page_title_left">
                  {bookInfo.map((props) => (
                    <>
                      <h3 className="f_s_30 f_w_700 dark_text">
                        {props.BookName}
                      </h3>
                      <span style={{ color: "#555" }}>By {props.Auther}</span>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className=" book-info mt-3">
            {bookInfo.map((props) => {
              const {
                _id,
                Image,
                Page,
                Language,
                Quantity,
                AgeGroup,
                Status,
                Genre,
                Description,
              } = props;
              return (
                <div key={_id}>
                  <div className="uk-grid uk-grid-match uk-flex-middle">
                    <div>
                      <img src={Image.url} alt="" />
                    </div>

                    <div className="uk-width-expand">
                      <div className="white_card">
                        <div className="box">
                          {/* <Stack spacing={1} className="mt-2 mb-1">
                            <Rating
                              name="half-rating-read"
                              value={props.Rating}
                              readOnly
                              size="small"
                              // precision={0.5}
                            />
                          </Stack> */}
                          <RatingStar rating={props.Rating} />

                          <p>Rating</p>
                        </div>
                        <div className="box">
                          <h5>{Page ? Page : "0"}</h5>
                          <p>Page</p>
                        </div>
                        <div className="box">
                          <h5>
                            {Language === "np"
                              ? "Nepali"
                              : Language === "en"
                              ? "English"
                              : Language === "tr"
                              ? "Translated"
                              : "Not mentioned"}
                          </h5>
                          <p>Language</p>
                        </div>
                        <div className="box">
                          <h5>{Quantity ? Quantity : "0"}</h5>
                          <p>Quantity</p>
                        </div>
                        <div className="box">
                          <h5>{AgeGroup ? AgeGroup : "Not mentioned"}</h5>
                          <p>Age Group</p>
                        </div>
                        <div className="box">
                          <h5>{Status === "1" ? "Yes" : "No"}</h5>
                          <p>Available</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="info-txt">
                      <h5>Genre: </h5>
                      <p>
                        {Genre.length > 0
                          ? Genre.map((genre, index) => (
                              <React.Fragment key={genre._id}>
                                {genre.title}
                                {index !== Genre.length - 1 && ","}{" "}
                              </React.Fragment>
                            ))
                          : "All"}
                      </p>
                    </div>

                    <h5 className="m-0">Description:</h5>

                    {Description ? (
                      <p dangerouslySetInnerHTML={{ __html: Description }} />
                    ) : (
                      "No description available."
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBook;
