import React from "react";
import "./CardItem.scss";

const mockProduct = {
  name: "Camisola cinzenta",
  price: "29.99€",
  image: "../../../public/imgs/ronaldo.jpg"
};

const CardItem = () => {
  return (
    <div className="card-item">
      <img src={mockProduct.image} alt={mockProduct.name} className="card-item__image" />
      <div className="card-item__info">
        <h2 className="card-item__name">{mockProduct.name}</h2>
        <p className="card-item__price">{mockProduct.price}</p>
      </div>
    </div>
  );
};

export default CardItem;
