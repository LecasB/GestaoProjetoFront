import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserCircle } from "react-icons/fa";
import "./UserMiniProfileItem.scss";

const UserMiniProfileItem = ({ id = "681fdfed8ff84f652a0dfb01" }) => {
  const [userDetails, setUserDetails] = useState("");

  const getUserInfo = async () => {
    fetch(`https://xuoapi.vercel.app/api/v1/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, [id]);

  const rating = 5;
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(<FaStar key={i} className="star" />);
      } else if (rating > i) {
        stars.push(<FaStarHalfAlt key={i} className="star" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    return stars;
  };

  return (
    <div className="userMiniProfileItem">
      <div className="userInfo">
        <img
          src={userDetails.image}
          style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          className="avatar"
        />
        <span className="name">{userDetails.username}</span>
      </div>
      <div className="ratingInfo">
        {renderStars()}
        <span className="reviews">(5)</span>
      </div>
    </div>
  );
};

export default UserMiniProfileItem;
