import React, { useContext, useEffect, useState } from "react";
import BookContext from "./bookContext";
import $ from "jquery";
import { toast } from "react-toastify";
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";
import NavbarContext from "../navbar-context";
import { Fetchdata } from "../../hooks/getData";

function BookState(props) {
  const { baseURL } = useContext(NavbarContext);

  const initialValue = {
    bookName: "",
    auther: "",
    ageGrp: "4-8",
    page: "",
    qty: "",
    genre: [],
    status: "1",
    rating: "",
    language: "en",
    description: "",
    userId: "-1",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [genreValue, setGenreValue] = useState([]);

  const [image, setImage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [value, setValue] = useState("");

  //   --- to get book list ---
  const [status, setStatus] = useState("-1");
  const [genre, setGenre] = useState("-1");
  const [bookData, setBookData] = useState([]);
  const [searchBook, setSearchBook] = useState(null);
  const [bookLoading, setBookLoading] = useState(true);

  useEffect(() => {
    getBookData();
  }, [status, genre]);

  const getBookData = () => {
    const dataForm = {
      FetchURL: `${baseURL}/api/getBook?UserID=-1&Status=${status}&Genres=${genre}`,
      Type: "GET",
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : [];
        setBookData(postResult);
        setSearchBook(postResult);
        setBookLoading(false);
      } else {
        setBookData([]);
        setSearchBook([]);
        setBookLoading(false);
      }
    });
  };

  //   --- to edit book ---
  const [isEditSubmit, setIsEditSubmit] = useState(false);
  const [perId, setPerId] = useState(null);
  const handleEdit = (data) => {
    $(".editPopBg").fadeIn(300);
    $(".editPop").slideDown(500);
    setPerId(data._id);

    setFormValue({
      bookName: data.BookName,
      auther: data.Auther,
      ageGrp: data.AgeGroup,
      page: data.Page,
      qty: data.Quantity,
      status: data.Status,
      rating: data.Rating,
      language: data.Language,
      userId: data.UserID,
    });
    setValue(data.Description);
    setPerId(data._id);
    setImage(data.Image.url);
    setIsUploaded(true);
    setGenreValue(data.Genre);
  };

  // --- to delete book ---

  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = (data) => {
    $(".deletePopBg").fadeIn(300);
    $(".deletePop").slideDown(500);
    setPerId(data._id);
  };

  const deleteBook = () => {
    setIsDelete(true);
    const dataForm = {
      BookID: perId,
      FLAG: "D",
      FetchURL: `${baseURL}/api/book`,
      Type: "POST",
    };

    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
          $(".deletePopBg").fadeOut(300);
          $(".deletePop").slideUp(500);
          toast.success(result.Message, {
            theme: "light",
          });
          const bookElement = document.getElementById(perId);
          bookElement.classList.add(
            "uk-animation-scale-up",
            "uk-animation-reverse"
          );

          setTimeout(() => {
            getBookData();
          }, 500);
          setIsDelete(false);
        } else {
          toast.error(result.Message, {
            theme: "light",
          });
          setIsDelete(false);
        }
      })
      .catch(() => {
        setIsDelete(false);
      });
  };

  // bulk delete

  const [bulkDelete, setBulkDelete] = useState(false);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [bulkBook, setBulkBook] = useState([]);

  const filteredBook = bookData.map((item) => item._id);

  useEffect(() => {
    if (bulkDelete) {
      setBulkBook(filteredBook);
    }
  }, [status, genre, bulkDelete, bookData]);

  const handleBulkDelete = () => {
    $(".deletePopBg").fadeIn(300);
    $(".deletePop").slideDown(500);
  };

  const deleteBulkBook = () => {
    setIsBulkDelete(true);
    const dataForm = {
      BulkBookID: bulkBook,
      FLAG: "BD",
      FetchURL: `${baseURL}/api/book`,
      Type: "POST",
    };

    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
          $(".deletePopBg").fadeOut(300);
          $(".deletePop").slideUp(500);
          toast.success(
            `${result.DeletedCount} ${
              result.DeletedCount > 1 ? "Books" : "Book"
            } deleted sucessfully`,
            {
              theme: "light",
            }
          );
          // const bookElement = document.getElementById(perId);
          // bookElement.classList.add(
          //   "uk-animation-scale-up",
          //   "uk-animation-reverse"
          // );

          getBookData();
          setIsBulkDelete(false);
          setBulkBook([]);
        } else {
          toast.error(result.Message, {
            theme: "light",
          });
          setIsBulkDelete(false);
        }
      })
      .catch(() => {
        setIsBulkDelete(false);
      });
  };

  return (
    <BookContext.Provider
      value={{
        formValue,
        setFormValue,
        initialValue,
        formError,
        setFormError,
        isSubmit,
        setIsSubmit,
        image,
        setImage,
        isUploaded,
        setIsUploaded,
        genre,
        setGenre,

        handleEdit,
        isEditSubmit,
        setIsEditSubmit,

        bookData,
        setBookData,
        searchBook,
        setSearchBook,
        status,
        setStatus,
        bookLoading,
        setBookLoading,
        getBookData,

        perId,
        setPerId,
        isDelete,
        setIsDelete,
        handleDelete,
        deleteBook,

        value,
        setValue,
        genreValue,
        setGenreValue,

        bulkDelete,
        setBulkDelete,
        bulkBook,
        setBulkBook,

        deleteBulkBook,
        handleBulkDelete,
        isBulkDelete,
        setIsBulkDelete,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
}

export default BookState;
