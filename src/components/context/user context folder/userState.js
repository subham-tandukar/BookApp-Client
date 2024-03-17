import React, { useContext, useEffect, useState } from "react";
import UserContext from "./userContext";
import $ from "jquery";
import { toast } from "react-toastify";
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";
import NavbarContext from "../navbar-context";
import { Fetchdata } from "../../hooks/getData";

function UserState(props) {
  const { baseURL } = useContext(NavbarContext);

  const [loading, setLoading] = useState(true);
  const [sortby, setSortby] = useState("");
  const [status, setStatus] = useState("-1");
  const [showLast, setShowLast] = useState(false);

  //  to search -------
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // get the user list-----------------------------------
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    userLst();
  }, [sortby, status, search, page, pageSize, showLast]);
  const userLst = () => {
    const dataForm = {
      Type: "GET",
      FetchURL: `${baseURL}/api/getUser?isVerified=${status}&sortby=${sortby}&page=${page}&pageSize=${pageSize}&search=${search}&last=${
        showLast === true ? "true" : ""
      }`,
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postPagination = result.Pagination ? result.Pagination : "";
        const postResult = result.Values ? result.Values : "";
        setUserList(postResult);
        setLoading(false);
        setIsSubmit(false);

        // Update total number of items
        const totalItems = postPagination.total || 0;
        setTotalItems(totalItems);

        // Calculate total number of pages based on total items and page size
        const calculatedTotalPages = Math.ceil(totalItems / pageSize);
        setTotalPages(calculatedTotalPages);
      } else {
        setUserList([]);
        setLoading(false);
        setIsSubmit(false);
      }
    });
  };

  const [perId, setPerId] = useState(null);

  // delete user-----------------------------------

  const [isDelete, setIsDelete] = useState(false);
  const [userDelete, setUserDelete] = useState("");

  const handleDelete = (data) => {
    setPerId(data._id);
    setUserDelete(data.Name);
    $(".deletePopBg").fadeIn(300);
    $(".deletePop").slideDown(500);
  };

  const deleteUser = () => {
    setIsDelete(true);
    const dataForm = {
      UserID: perId,
      FLAG: "D",
      FetchURL: `${baseURL}/api/user`,
      Type: "POST",
    };

    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
          $(".deletePopBg").fadeOut(300);
          $(".deletePop").slideUp(500);
          toast.success(`User ${userDelete} deleted sucessfully`, {
            theme: "light",
          });

          setIsDelete(false);
          userLst();
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

  // Bulk delete user
  const [bulkDelete, setBulkDelete] = useState(false);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [bulkUsers, setBulkUsers] = useState([]);

  // For all the users for bulk delete
  const [selectedAllUserIds, setSelectedAllUserIds] = useState([]);

  useEffect(() => {
    if (bulkDelete) {
      alluserLst();
    } else {
      setSelectedAllUserIds([]);
    }
  }, [
    bulkDelete,
    sortby,
    status,
    search,
    page,
    pageSize,
    showLast,
    totalItems,
  ]);
  const alluserLst = () => {
    const dataForm = {
      Type: "GET",
      FetchURL: `${baseURL}/api/getUser?isVerified=${status}&sortby=${sortby}&page=1&pageSize=${totalItems}&search=${search}&last=${
        showLast === true ? "true" : ""
      }`,
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        // If all users are selected, update selectedAllUserIds accordingly

        const filteredUsers = postResult.map((user) => user._id);
        setSelectedAllUserIds(filteredUsers);
        setBulkUsers(filteredUsers);
      } else {
        setSelectedAllUserIds([]);
      }
    });
  };

  const handleBulkDelete = () => {
    $(".deletePopBg").fadeIn(300);
    $(".deletePop").slideDown(500);
  };

  const deleteBulkUser = () => {
    setIsBulkDelete(true);
    const dataForm = {
      BulkUserID: bulkUsers,
      FLAG: "BD",
      FetchURL: `${baseURL}/api/user`,
      Type: "POST",
    };

    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
          $(".deletePopBg").fadeOut(300);
          $(".deletePop").slideUp(500);
          toast.success(
            `${result.DeletedCount} ${
              result.DeletedCount > 1 ? "Users" : "User"
            } deleted sucessfully`,
            {
              theme: "light",
            }
          );

          setIsBulkDelete(false);
          setBulkUsers([]);
          userLst();
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
    <UserContext.Provider
      value={{
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
        handleDelete,
        deleteUser,
        isDelete,
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
        setIsBulkDelete,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
