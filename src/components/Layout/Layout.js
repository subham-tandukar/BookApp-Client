import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import $ from "jquery";
import NavbarContext from "../context/navbar-context";
import Footer from "../Footer";
import Toast from "../Toast";

const Layout = (props) => {
  const { userDetails, setUserDetails } = useContext(NavbarContext);

  const [sidePanel, setSidePanel] = useState(false);
  const [mobSidePanel, setMobSidePanel] = useState(false);

  useEffect(() => {
    const cur_user = localStorage.getItem("token");

    cur_user.length && setUserDetails(JSON.parse(cur_user));
  }, []);

  const handleMobHam = () => {
    setMobSidePanel(!mobSidePanel);
  };
  const handleHam = () => {
    setSidePanel(!sidePanel);
  };
  return (
    <>
      <nav
        className={`sidebar ${sidePanel ? "mini_sidebar" : ""} ${
          mobSidePanel ? "active_sidebar" : ""
        }`}
      >
        <Sidebar
          userDetails={userDetails}
          handleMobHam={handleMobHam}
          handleHam={handleHam}
        />
      </nav>

      <section
        className={`main_content dashboard_part large_header_bg ${
          sidePanel ? "full_main_content" : ""
        }`}
      >
        <Navbar
          userDetails={userDetails}
          handleMobHam={handleMobHam}
          handleHam={handleHam}
        />

        <Toast />

        <div className="main_content_iner overly_inner">{props.children}</div>

        <div className={`footer_part ${sidePanel ? "full_footer" : ""}`}>
          <Footer />
        </div>
      </section>
    </>
  );
};

export default Layout;
