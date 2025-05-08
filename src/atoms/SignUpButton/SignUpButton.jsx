import React from 'react';
import './Assets/Css/SignUpButton.css';

const SignUpButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="sign-up-button__button">
      Sign Up
    </button>
  );
};

export default SignUpButton;
