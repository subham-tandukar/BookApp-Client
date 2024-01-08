import React, { useState } from "react";

const NavbarContext = React.createContext();

export const NavbarContextProvider = (props) => {
  const baseURL = "http://localhost:8009";
  // const baseURL = process.env.REACT_APP_URL;

  const [userDetails, setUserDetails] = useState("");

  return (
    <NavbarContext.Provider
      value={{
        userDetails,
        setUserDetails,
        baseURL,
      }}
    >
      {props.children}
    </NavbarContext.Provider>
  );
};

export default NavbarContext;
