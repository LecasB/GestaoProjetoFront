import React from "react";
import "./CardItem.scss";


const CardItem = ({image,name,price}) => {
  return (
    <div className="card-item">
      <img src={image} alt={name} className="card-item__image" />
      <div className="card-item__info">
        <p className="card-item__name">{name}</p>
        <p className="card-item__price">{price}</p>
      </div>
    </div>
  );
};

export default CardItem;
