import React from 'react';
import './Assets/Css/BuyButton.css';

const BuyButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="buy-button__button">
      Buy
    </button>
  );
};

export default BuyButton;
