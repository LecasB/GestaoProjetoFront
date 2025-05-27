import React, { useState, useEffect } from "react";
import "./CardItem.scss";
import { useNavigate } from "react-router-dom";

const CardItem = ({ id, image, name, price }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("id");

  useEffect(() => {
    if (!userId || !id) return;
  
    
    fetch(`https://xuoapi.azurewebsites.net/api/v1/items/${id}`)
      .then((response) => response.json())
      .then((itemData) => {
        const isUserOwner = itemData.idseller === userId;
        setIsOwner(isUserOwner);
  
        
        if (!isUserOwner) {
          fetch(`https://xuoapi.azurewebsites.net/api/v1/favorite/getAllByUserId/${userId}`)
            .then((response) => response.json())
            .then((favorites) => {
              const favFound = favorites.some((fav) => fav._id === id);
              setIsFavourite(favFound);
            })
            .catch((err) => {
              console.error("Error fetching favorites:", err);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });
  }, [id, userId]);
  

  const handleFavouriteClick = () => {
    if (!userId) {
      alert("Please log in to add to favourites.");
      return;
    }
    
    const url = isOwner ? navigate(`/edit-item?id=${id}`)
    : isFavourite
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
        setIsFavourite(!isFavourite);
      })
      .catch((error) => {
        console.error("Error updating favourites:", error);
      });
  };

  const iconSrc = isOwner
    ? "https://xuobucket.blob.core.windows.net/utils/pencil_edit.svg"
    : isFavourite
    ? "https://xuobucket.blob.core.windows.net/utils/heart_fill.svg"
    : "https://xuobucket.blob.core.windows.net/utils/heart_empty.svg";

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
          cursor: "pointer",
        }}
        onClick={handleFavouriteClick}
        src={iconSrc}
        alt={isOwner ? "Owner" : isFavourite ? "Favourite" : "Not favourite"}
      />
      <div className="card-item__info">
        <p className="card-item__name">{name}</p>
        <p className="card-item__price">{price}€</p>
      </div>
    </div>
  );
};

export default CardItem;
