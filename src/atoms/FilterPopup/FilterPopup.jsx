import React, { useEffect } from "react";
import { useState } from "react";

const FilterPopup = ({ visible, onFilterChange }) => {
  const [filtros, setFiltros] = useState([]);

  const handleFilterChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const updated = checked
      ? [...filtros, value]
      : filtros.filter((f) => f !== value);

    setFiltros(updated);
    onFilterChange(updated);
    console.log(updated);
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          display: visible ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 500,
        }}
      />

      {/* Popup */}
      <div
        className="filter-popup"
        style={{
          display: visible ? "block" : "none",
          position: "fixed",
          top: "15%",
          left: "50%",
          width: "100%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "8px",
          zIndex: 600,
        }}
      >
        <p>Estado do Item:</p>
        <div className="filter-options">
          {["new", "refurbished", "used", "broken"].map((option) => (
            <label
              key={option}
              style={{ display: "block", margin: "0.5rem 0" }}
            >
              <input
                type="checkbox"
                name="category"
                value={option}
                onChange={(e) => {
                  handleFilterChange(e);
                }}
              />
              {" " + option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterPopup;
