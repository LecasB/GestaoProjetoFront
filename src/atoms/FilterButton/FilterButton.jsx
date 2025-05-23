import { useState, useRef, useEffect } from "react";
import "./FilterButton.scss";

const FilterButton = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="filter-container" ref={buttonRef}>
      <button
        className={`filter-button ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span> FILTER </span>
        <svg
          className="arrow-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points={isOpen ? "6 15 12 9 18 15" : "6 9 12 15 18 9"} />
        </svg>
      </button>

      {isOpen && (
        <ul className="filter-dropdown">
          <li onClick={() => handleOptionClick("VENDIDOS")}>VENDIDOS</li>
          <li onClick={() => handleOptionClick("COMPRADOS")}>COMPRADOS</li>
          <li onClick={() => handleOptionClick("WISHLIST")}>WISHLIST</li>
        </ul>
      )}
    </div>
  );
};

export default FilterButton;
