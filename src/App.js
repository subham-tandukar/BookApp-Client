import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import "./App.css";

import Login from "./components/Login/Login";
import AuthContext from "./components/context/auth-context";
import ErrorPage from "./components/ErrorPage";
// import UserState from "./components/context/user context folder/userState";
// import User from "./components/User/User";
import Dashboard from "./components/Dashboard/Dashboard";
import AddBook from "./components/Books/AddBook";
import Book from "./components/Books/Book";
import User from "./components/User/User";
import AddUser from "./components/User/AddUser";
import RentedBook from "./components/Books/RentedBook";
import ScrollToTop from "./components/ScrollToTop";
import Register from "./components/register/Register";
import ForgetPassword from "./components/Login/ForgetPassword";
import BookState from "./components/context/book context folder/bookState";
import GenreState from "./components/context/genre context folder/genreState";
import Genre from "./components/Genre/Genre";
import ViewBook from "./components/Books/ViewBook";

const App = () => {
  const { UserDATA } = useContext(AuthContext);

  return (
    <>
      <Routes>
        {!UserDATA && <Route path="*" element={<Login />} />}
        {!UserDATA && <Route path="/register" element={<Register />} />}
        {!UserDATA && (
          <Route path="/forgot-password" element={<ForgetPassword />} />
        )}
        {UserDATA && <Route path="/login" element={<Navigate to="/" />} />}
      </Routes>

      <div className="app">
        {UserDATA && (
          <>
            {/* <UserState> */}
            <GenreState>
              <BookState>
                <ScrollToTop />
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/book" element={<Book />} />
                    <Route path="/add-book" element={<AddBook />} />
                    <Route path="/view-book/:id" element={<ViewBook />} />
                    <Route path="/rented-book" element={<RentedBook />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/add-user" element={<AddUser />} />
                    <Route path="/genre" element={<Genre />} />

                    {/* Page Not Found */}
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </Layout>
              </BookState>
            </GenreState>
            {/* </UserState> */}
          </>
        )}
      </div>
    </>
  );
};

export default App;
