import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import MetisMenu from "@metismenu/react";
import "../../../node_modules/metismenujs/dist/metismenujs.css";
import logo from "../../img/logo.png";
import minilogo from "../../img/mini_logo.png";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import UsewindowDimension from "../hooks/UsewindowDimension";
import dashboard from "../../img/icon/dashboard.svg";
import user from "../../img/icon/user.svg";
import book from "../../img/icon/book.svg";
import order from "../../img/icon/order.svg";

const Sidebar = ({ handleMobHam }) => {
  return (
    <>
      <div className="logo d-flex justify-content-between uk-position-relative">
        <a className="large_logo">
          <img src={logo} alt="" />
        </a>
        <a className="small_logo">
          <img src={minilogo} alt="" />
        </a>
        <div className="sidebar_close_icon d-lg-none" onClick={handleMobHam}>
          <GrFormClose />
        </div>
      </div>
      <div id="sidebar_menu">
        <MetisMenu>
          <li className="">
            <NavLink
              className=""
              to="/"
              aria-expanded="false"
              onClick={handleMobHam}
            >
              <div className="nav_icon_small">
                <img src={dashboard} alt="" />
              </div>
              <div className="nav_title">
                <span>Dashboard </span>
              </div>
            </NavLink>
          </li>
          <li className="">
            <Link className="has-arrow" aria-expanded="false">
              <div className="nav_icon_small">
                <img src={book} alt="" />
              </div>
              <div className="nav_title">
                <span>Books </span>
              </div>
            </Link>
            <ul>
              <li>
                <NavLink to="/book" onClick={handleMobHam}>
                  Books
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-book" onClick={handleMobHam}>
                  Add Book
                </NavLink>
              </li>
              <li>
                <NavLink to="/borrowed-book" onClick={handleMobHam}>
                  Borrowed Books
                </NavLink>
              </li>
              <li>
                <NavLink to="/rented-book" onClick={handleMobHam}>
                  Rented Books
                </NavLink>
              </li>
              <li>
                <NavLink to="/read-book" onClick={handleMobHam}>
                  Read Books
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="">
            <Link className="has-arrow" aria-expanded="false">
              <div className="nav_icon_small">
                <img src={user} alt="" />
              </div>
              <div className="nav_title">
                <span>Users</span>
              </div>
            </Link>
            <ul>
              <li>
                <NavLink to="/user" onClick={handleMobHam}>
                  Users List
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-user" onClick={handleMobHam}>
                  Add New User
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="">
            <NavLink to="/order" onClick={handleMobHam}>
              <div className="nav_icon_small">
                <img src={order} alt="" />
              </div>
              <div className="nav_title">
                <span>Order</span>
              </div>
            </NavLink>
          </li>
        </MetisMenu>
      </div>
    </>
  );
};

export default Sidebar;
