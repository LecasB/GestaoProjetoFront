import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserCircle } from "react-icons/fa";
import "./UserMiniProfileItem.scss";
import { useNavigate } from "react-router-dom";

const UserMiniProfileItem = ({ id }) => {
  const [userDetails, setUserDetails] = useState("");
  const [userRating, setUserRating] = useState("");
  const navigate = useNavigate();

  const getUserInfo = async () => {
    fetch(`https://xuoapi.azurewebsites.net/api/v1/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  };

  const getUserRate = () => {
    fetch(
      `https://xuoapi.azurewebsites.net/api/v1/review/${id}/rate`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("User rate data:", data);
        setUserRating(data);
      })
      .catch((error) => {
        console.error("Error fetching user rate:", error);
      });
  };

  

  useEffect(() => {
    getUserInfo();
    getUserRate();
  }, []);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (userRating.averageRate >= i + 1) {
        stars.push(
          <img
            key={i}
            style={{ height: "20px", width: "20px" }}
            src="https://xuobucket.blob.core.windows.net/utils/estrelita.png"
          />
        );
      } else if (userRating.averageRate > i) {
        stars.push(
          <img
            key={i}
            style={{ height: "20px", width: "12px" }}
            src="https://xuobucket.blob.core.windows.net/utils/meia-estrelita.png"
          />
        );
      } else {
        ""
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
          onClick={() => {
            navigate(`/profile?id=${userDetails._id}`);
          }}
        />
        <span className="name">{userDetails.username}</span>
      </div>
      <div className="ratingInfo">
        {renderStars()}
        <span className="reviews">({userRating.totalReviews} Reviews)</span>
      </div>
    </div>
  );
};

export default UserMiniProfileItem;
