import React from "react";
import { AiFillWarning } from "react-icons/ai";
import "./ReportButton.scss";

const ReportButton = ({ onClick }) => {
  return (
    <div className="reportButton" onClick={onClick}>
      <p className="text">Found anything suspicius?</p>
      <AiFillWarning className="icon" />
    </div>
  );
};

export default ReportButton;
