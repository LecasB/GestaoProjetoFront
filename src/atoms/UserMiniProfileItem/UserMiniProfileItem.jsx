import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserCircle } from "react-icons/fa";
import "./UserMiniProfileItem.scss";
import { useNavigate } from "react-router-dom";

const UserMiniProfileItem = ({ id }) => {
  const [userDetails, setUserDetails] = useState("");
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

  useEffect(() => {
    getUserInfo();
  }, []);

  const rating = 4.5;
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(
          <img
            key={i}
            style={{ height: "20px", width: "20px" }}
            src="https://xuobucket.blob.core.windows.net/utils/estrelita.png"
          />
        );
      } else if (rating > i) {
        stars.push(
          <img
            key={i}
            style={{ height: "20px", width: "12px" }}
            src="https://xuobucket.blob.core.windows.net/utils/meia-estrelita.png"
          />
        );
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
          onClick={() => {
            navigate(`/profile?id=${userDetails._id}`);
          }}
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
