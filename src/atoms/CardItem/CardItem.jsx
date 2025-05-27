import React, { useState, useEffect } from "react";
import "./CardItem.scss";
import { useNavigate } from "react-router-dom";

const CardItem = ({ id, image, name, price }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const userId = sessionStorage.getItem("id");
  if (!userId) return;

  fetch(`https://xuoapi.azurewebsites.net/api/v1/favorite/getAllByUserId/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      const favFound = data.some((fav) => fav._id === id);
      setIsFavourite(favFound);
    })
    .catch((error) => {
      console.error("Error fetching favorites:", error);
      setIsFavourite(false);
    });
}, [id]);

  return (
    <div className="card-item" style={{ position: "relative" }}>
      <img
        src={image}
        alt={name}
        className="card-item__image"
        onClick={() => navigate(`/item?id=${id}`)}
      />
      <img
        style={{
          height: "50px",
          width: "50px",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
        onClick={() => {
          if (!sessionStorage.getItem("id")) {
            alert("Please log in to add to favourites.");
            return;
          }
          setIsFavourite(!isFavourite);
          const userId = sessionStorage.getItem("id");
          const url = isFavourite
            ? `https://xuoapi.azurewebsites.net/api/v1/favorite/deleteFavorite`
            : `https://xuoapi.azurewebsites.net/api/v1/favorite/addFavorite`;

          fetch(url, {
            method: isFavourite ? "DELETE" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              iduser: userId,
              iditem: id,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error("Error updating favourites:", error);
            });
        }}
        src={
          isFavourite
            ? "https://xuobucket.blob.core.windows.net/utils/heart_fill.svg"
            : "https://xuobucket.blob.core.windows.net/utils/heart_empty.svg"
        }
        alt={isFavourite ? "Favourite" : "Not favourite"}
      />
      <div className="card-item__info">
        <p className="card-item__name">{name}</p>
        <p className="card-item__price">{price}€</p>
      </div>
    </div>
  );
};

export default CardItem;
