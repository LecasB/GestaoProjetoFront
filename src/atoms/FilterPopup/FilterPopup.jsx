import React, { useEffect, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import "./FilterPopup.scss";

const FilterPopup = ({
  visible,
  onConditionChange,
  onMinValueChange,
  onMaxValueChange,
  onApply,
  onClose,
}) => {
  const [filtros, setFiltros] = useState([]);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  const handleFilterChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const updated = checked
      ? [...filtros, value]
      : filtros.filter((f) => f !== value);

    setFiltros(updated);
    onConditionChange(updated);
  };

  const handleMinValueChange = (e) => {
    setMinValue(e.value);
    onMinValueChange(e.value);
  };

  const handleMaxValueChange = (e) => {
    setMaxValue(e.value);
    onMaxValueChange(e.value);
  };

  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        onApply();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, onApply, onClose]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <>
      <div
        onClick={onClose}
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

      <div
        onClick={(e) => e.stopPropagation()}
        className="filter-popup"
        style={{
          display: visible ? "block" : "none",
          position: "fixed",
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
            <label key={option} style={{ display: "block", margin: "0.5rem 0" }}>
              <input
                type="checkbox"
                name="category"
                value={option}
                onChange={handleFilterChange}
              />
              {" " + option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
          <label htmlFor="currency">Valor Minimo:</label>
          <InputNumber
            inputId="currency-germany"
            input="minvalue"
            mode="currency"
            onChange={handleMinValueChange}
            currency="EUR"
            locale="de-DE"
          />
          <br />
          <label htmlFor="currency">Valor Maximo:</label>
          <InputNumber
            inputId="currency-germany"
            input="maxvalue"
            onChange={handleMaxValueChange}
            mode="currency"
            currency="EUR"
            locale="de-DE"
          />
          <Button
            label="Apply"
            onClick={() => {
              onApply();
              onClose();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default FilterPopup;
