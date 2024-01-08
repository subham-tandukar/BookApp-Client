import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const RatingStar = ({ rating }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <FaStar color="#F5C900" />
        ) : rating >= number ? (
          <FaStarHalfAlt color="#F5C900" />
        ) : (
          <AiOutlineStar color="#F5C900" />
        )}
      </span>
    );
  });
  return <span>{ratingStar}</span>;
};

export default RatingStar;
