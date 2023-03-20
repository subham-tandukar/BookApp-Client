import React from "react";

const Loading = ({ title }) => {
  return (
    <div class="pre-loader">
      <div class="loading">
        <div class="loader-icon"></div>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default Loading;
