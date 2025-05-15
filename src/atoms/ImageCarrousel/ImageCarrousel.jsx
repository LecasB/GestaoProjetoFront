import React, { useState } from "react";
import "./ImageCarrousel.scss";

const images = [
  "/imgs/ronaldo.jpg",
  "/imgs/ronaldo2.jpg",
  "/imgs/ronaldo3.jpg",
];

const ImageCarrousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="image-carrousel">
      <button onClick={prevImage} className="image-carrousel__button">‹</button>

      <div
        className="image-carrousel__slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Imagem ${index + 1}`}
            className="image-carrousel__image"
          />
        ))}
      </div>

      <div className="image-carrousel__dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`image-carrousel__dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <button onClick={nextImage} className="image-carrousel__button">›</button>
    </div>
  );
};

export default ImageCarrousel;
