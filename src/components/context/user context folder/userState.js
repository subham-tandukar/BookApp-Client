// import React, { useContext, useEffect, useState } from "react";
// import UserContext from "./userContext";
// import $ from "jquery";
// import { toast } from "react-toastify";
// import "../../../../node_modules/react-toastify/dist/ReactToastify.css";
// import NavbarContext from "../navbar-context";
// import { Fetchdata } from "../../hooks/getData";

// function UserState(props) {
//   const { baseURL } = useContext(NavbarContext);

//   const initialValue = {
//     name: "",
//     email: "",
//     password: "",
//     roleName: "",
//   };

//   const [inputData, setInputData] = useState(initialValue);

//   const [reload, setReload] = useState(false);
//   const [formError, setFormError] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const [typeFile, setTypeFile] = useState("");
//   const [image, setImage] = useState("");

//   const [userData, setUserData] = useState([]);
//   const [originalList, setOriginalList] = useState(null);
//   console.log("get user data", userData);

//   // add user-----------------------------------
//   const addUser = () => {
//     const dataForm = {
//       name: inputData.name,
//       email: inputData.email,
//       password: inputData.password,
//       roleName: inputData.roleName,
//       // image: image,
//       FetchURL: `${baseURL}/api/addUser`,
//       Type: "POST",
//     };
//     console.log(dataForm);
//     Fetchdata(dataForm).then(function (result) {
//       console.log("result", result);
//       if (result.StatusCode === 200) {
//         toast.success("User added sucessfully", {
//           theme: "light",
//         });
//         setReload(!reload);
//         $(".add-user-bg").fadeOut(300);
//         $(".add-user").slideUp(500);
//       } else {
//         toast.error(result.Message, {
//           theme: "light",
//         });
//       }
//     });
//   };

//   // get user-----------------------------------
//   useEffect(() => {
//     getUserData();
//   }, [reload]);

//   const getUserData = () => {
//     const dataForm = {
//       FetchURL: `${baseURL}/api/getUserData`,
//       Type: "GET",
//     };

//     Fetchdata(dataForm).then(function (result) {
//       console.log("result", result);
//       if (result.StatusCode === 200) {
//         const postResult = result.UserData ? result.UserData : "";
//         setUserData(postResult);
//         setOriginalList(postResult);
//         setLoading(false);
//       } else {
//         setUserData([]);
//         setLoading(false);
//       }
//     });
//   };

//   // view user-----------------------------------

//   const [viewID, setViewId] = useState("");
//   const [view, setView] = useState([]);

//   const handleView = (data) => {
//     setViewId(data._id);
//     $(".view-user-bg").fadeIn(300);
//     $(".view-user").slideDown(500);
//   };

//   const id = viewID;

//   const viewData = () => {
//     const dataForm = {
//       FetchURL: `${baseURL}/getUser/${id}`,
//       Type: "GET",
//     };

//     Fetchdata(dataForm).then(function (result) {
//       console.log("result", result);
//       if (result.StatusCode === 200) {
//         const postResult = result.UserList[0] ? result.UserList[0] : "";
//         setView(postResult);
//         setLoading(false);
//       } else {
//         setView([]);
//         setLoading(false);
//       }
//     });
//   };

//   useEffect(() => {
//     viewData();
//   }, [id, reload]);

//   // edit user-----------------------------------
//   const [perEditSubmit, setPerEditSubmit] = useState(false);
//   const [perID, setPerId] = useState(null);
//   const [userEdit, setUserEdit] = useState("");

//   const handleEdit = (data) => {
//     setPerId(data._id);
//     setUserEdit(data.name);
//     $(".edit-user-bg").fadeIn(300);
//     $(".edit-user").slideDown(500);
//     setInputData({
//       name: data.name,
//       email: data.email,
//       password: data.password,
//       roleName: data.roleName,
//     });
//   };

//   const editid = perID;

//   const editUser = () => {
//     const dataForm = {
//       name: inputData.name,
//       email: inputData.email,
//       password: inputData.password,
//       roleName: inputData.roleName,
//       FetchURL: `${baseURL}/updateUser/${editid}`,
//       Type: "PATCH",
//     };

//     Fetchdata(dataForm).then(function (result) {
//       console.log("result", result);
//       if (result.StatusCode === 200) {
//         toast.success(`User ${userEdit} updated sucessfully`, {
//           theme: "light",
//         });
//         setReload(!reload);
//         $(".edit-user-bg").fadeOut(300);
//         $(".edit-user").slideUp(500);
//       } else {
//         toast.error(result.Message, {
//           theme: "light",
//         });
//       }
//     });
//   };

//   // delete user-----------------------------------
//   const [deleteID, setDeleteId] = useState(null);
//   const [userDelete, setUserDelete] = useState("");

//   const handleDelete = (data) => {
//     setDeleteId(data._id);
//     setUserDelete(data.name);
//     $(".delete-user-bg").fadeIn(300);
//     $(".delete-user").slideDown(500);
//   };

//   const deleteid = deleteID;

//   const deleteUser = () => {
//     const dataForm = {
//       FetchURL: `${baseURL}/deleteUser/${deleteid}`,
//       Type: "DELETE",
//     };

//     Fetchdata(dataForm).then(function (result) {
//       console.log("result", result);
//       if (result.StatusCode === 200) {
//         toast.success(`User ${userDelete} deleted sucessfully`, {
//           theme: "light",
//         });
//         setReload(!reload);
//         $(".delete-user-bg").fadeOut(300);
//         $(".delete-user").slideUp(500);
//         getUserData();
//       } else {
//         toast.error(result.Message, {
//           theme: "light",
//         });
//       }
//     });
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         inputData,
//         setInputData,
//         initialValue,
//         formError,
//         setFormError,
//         isSubmit,
//         setIsSubmit,
//         addUser,
//         userData,
//         setUserData,
//         setReload,
//         reload,
//         perEditSubmit,
//         setPerEditSubmit,
//         handleEdit,
//         handleView,
//         view,
//         loading,
//         editUser,
//         handleDelete,
//         deleteUser,
//         originalList,
//         setOriginalList,

//         typeFile,
//         setTypeFile,
//         image,
//         setImage,
//       }}
//     >
//       {props.children}
//     </UserContext.Provider>
//   );
// }

// export default UserState;
