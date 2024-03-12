import React, { useState, useEffect } from "react";
import { FcClock, FcCalendar } from "react-icons/fc";

const Heading = ({ title }) => {
  const todayDate = new Date().toLocaleDateString();
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup function to clear the interval when component unmounts or when the dependency array changes
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array so that the effect runs only once

  return (
    <div className="page_title_box d-flex flex-wrap align-items-center justify-content-between">
      <div className="page_title_left d-flex align-items-center">
        <h3 className="f_s_25 f_w_700 dark_text mr_30">{title}</h3>
      </div>
      <div className="uk-flex uk-flex-middle">
        <div className="date-time">
          <FcCalendar />
          {todayDate}
        </div>

        <div className="date-time">
          <FcClock />
          {currentTime}
        </div>
      </div>
    </div>
  );
};

export default Heading;
