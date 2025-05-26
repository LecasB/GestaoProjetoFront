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
      .then(response => response.json())
      .then(data => {
        // Use data.items array here
        if (Array.isArray(data.items)) {
          const favFound = data.items.some(fav => fav._id === id);
          setIsFavourite(favFound);
        } else {
          setIsFavourite(false);
        }
      })
      .catch(error => {
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
        style={{ height: "50px", width: "50px", position: "absolute", top: "10px", right: "10px" }}
        src={
          isFavourite
            ? "https://xuobucket.blob.core.windows.net/utils/heart_fill.svg" // filled heart
            : "https://xuobucket.blob.core.windows.net/utils/heart_empty.svg"  // empty heart
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
