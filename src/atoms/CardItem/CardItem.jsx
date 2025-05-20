import React from "react";
import "./CardItem.scss";
import { useNavigate } from "react-router-dom";

const CardItem = ({ id, image, name, price }) => {
  const navigate = useNavigate();

  return (
    <div className="card-item">
      <img
        src={image}
        alt={name}
        className="card-item__image"
        onClick={() => navigate(`/item?id=${id}`)}
      />
      <div className="card-item__info">
        <p className="card-item__name">{name}</p>
        <p className="card-item__price">{price}€</p>
      </div>
    </div>
  );
};

export default CardItem;
