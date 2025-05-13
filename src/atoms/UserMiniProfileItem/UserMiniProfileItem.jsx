import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserCircle } from "react-icons/fa";
import "./UserMiniProfileItem.scss";

const UserMiniProfileItem = ({ name, rating, reviews }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(<FaStar key={i} className="star"/>);
      } else if (rating > i) {
        stars.push(<FaStarHalfAlt key={i} className="star"/>);
      } else {
        stars.push(<FaRegStar key={i} className="star"/>);
      }
    }
    return stars;
  };

  return (
    <div className="userMiniProfileItem">
      <div className="userInfo">
        <FaUserCircle className="avatar" />
        <span className="name">{name}</span>
      </div>
      <div className="ratingInfo">
        {renderStars()}
        <span className="reviews">({reviews})</span>
      </div>
    </div>
  );
};

export default UserMiniProfileItem;
