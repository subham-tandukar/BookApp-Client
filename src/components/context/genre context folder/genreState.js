import React, { useContext, useEffect, useState } from "react";
import GenreContext from "./genreContext";
import $ from "jquery";
import { toast } from "react-toastify";
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";
import NavbarContext from "../navbar-context";
import { Fetchdata } from "../../hooks/getData";

function GenreState(props) {
  const { baseURL } = useContext(NavbarContext);

  const initialValue = {
    genre: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalList, setOriginalList] = useState(null);

  const [genreImage, setGenreImage] = useState(null);
  const [genreIsUploaded, setGenreIsUploaded] = useState(false);

  //API to hit genre list
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    genreLst();
  }, []);

  const genreLst = () => {
    const dataForm = {
      FLAG: "S",
      Type: "POST",
      FetchURL: `${baseURL}/api/genre`,
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setGenreList(postResult);
        setOriginalList(postResult);
        setLoading(false);
      } else {
        setGenreList([]);
        setOriginalList([]);
        setLoading(false);
      }
    });
  };

  //   --- to edit genre ---
  const [isEditSubmit, setIsEditSubmit] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [perId, setPerId] = useState(null);
  const handleEdit = (data) => {
    setPerId(data._id);
    setFormValue({
      genre: data.title,
    });
    setGenreImage(data.image.url);
    setGenreIsUploaded(true);
    setToggleBtn(true);
    setFormError({});
  };

  // --- to delete genre ---

  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = (data) => {
    $(".deletePopBg").fadeIn(300);
    $(".deletePop").slideDown(500);
    setPerId(data._id);
  };

  const deleteGenre = () => {
    setIsDelete(true);
    const dataForm = {
      GenreID: perId,
      FLAG: "D",
      FetchURL: `${baseURL}/api/genre`,
      Type: "POST",
    };

    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
          genreLst();
          $(".deletePopBg").fadeOut(300);
          $(".deletePop").slideUp(500);
          toast.success(result.Message, {
            theme: "light",
          });

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

  return (
    <GenreContext.Provider
      value={{
        formValue,
        setFormValue,
        initialValue,
        formError,
        setFormError,
        isSubmit,
        setIsSubmit,
        genreImage,
        setGenreImage,
        genreIsUploaded,
        setGenreIsUploaded,
        genreList,
        setGenreList,
        genreLst,
        loading,
        originalList,

        handleEdit,
        isEditSubmit,
        setIsEditSubmit,
        toggleBtn,
        setToggleBtn,

        perId,
        setPerId,
        isDelete,
        setIsDelete,
        handleDelete,
        deleteGenre,
      }}
    >
      {props.children}
    </GenreContext.Provider>
  );
}

export default GenreState;
