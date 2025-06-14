import React, { useEffect, useState } from "react";
import "./ImageCarrousel.scss";

const ImageCarrousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesList, setImagesList] = useState([]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    console.log(images);
    setImagesList(images);
  }, [images]);

  return (
    <div className="image-carrousel">
      {imagesList.length > 1 && (
        <button onClick={prevImage} className="image-carrousel__button">
          ‹
        </button>
      )}

      <div
        className="image-carrousel__slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imagesList.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Imagem ${index + 1}`}
            className="image-carrousel__image"
          />
        ))}
      </div>

      {imagesList.length > 1 && (
        <div className="image-carrousel__dots">
          {imagesList.map((_, index) => (
            <span
              key={index}
              className={`image-carrousel__dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
      {imagesList.length > 1 && (
        <button onClick={nextImage} className="image-carrousel__button">
          ›
        </button>
      )}
    </div>
  );
};

export default ImageCarrousel;
