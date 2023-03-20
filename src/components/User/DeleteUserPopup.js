// import React, { useContext } from "react";
// import $ from "jquery";
// import { GrFormClose } from "react-icons/gr";
// import UserContext from "../context/user context folder/userContext";

// const DeleteUserPopup = () => {
//   const { deleteUser } = useContext(UserContext);

//   const handleClose = () => {
//     $(".delete-user-bg").fadeOut(300);
//     $(".delete-user").slideUp(500);
//   };

//   const handleDelete = () => {
//     deleteUser();
//   };

//   return (
//     <>
//       <section className="popup-bg delete-user-bg">
//         <div className="popup delete-user">
//           <div className="popup-head">
//             <h4>Delete User</h4>
//             <div className="close" onClick={handleClose}>
//               <GrFormClose size="2rem" color="#fff" />
//             </div>
//           </div>

//           <div className="popup-body">
//             <p style={{ color: "#000" }}>Are you sure you want to delete?</p>
//           </div>
//           <div className="popup-footer">
//             <button className="uk-button cancel-btn" onClick={handleDelete}>
//               Delete
//             </button>
//             <button
//               className="uk-button "
//               style={{
//                 background: "#ff0002",
//                 borderColor: "#ff0002",
//                 color: "#fff",
//                 marginLeft: "0.5rem",
//               }}
//               onClick={handleClose}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default DeleteUserPopup;
