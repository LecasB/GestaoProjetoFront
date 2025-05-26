import { Link } from "react-router";
import "./PopupTemplate.scss";

const PopupTemplate = ({ title, content, onClose }) => {
  return (
    <div className="popup-template">
      <div className="popup-template__overlay" onClick={onClose}></div>
      <div className="popup-template__content">
        <h2 className="popup-template__title">{title}</h2>
        <p className="popup-template__text">{content}</p>
        <Link to={"/feedback"} className="popup-template__close-button">
          Comprar
        </Link>
        <button className="popup-template__close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default PopupTemplate;
