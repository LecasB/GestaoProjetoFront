import React, { useState, useEffect, useRef } from "react";
import "./Header.scss";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaBell,
  FaCommentDots,
  FaBars,
} from "react-icons/fa";
import logo from "../../../public/imgs/xuo.png";
import profilePic from "../../../public/imgs/ronaldo.jpg";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);
  const [showSearch, setShowSearch] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 430);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // FECHAR O DRAWER AO CLICAR FORA
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
    };

    if (drawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerOpen]);

  return (
    <>
      {isMobile && drawerOpen && (
        <div className="drawerOverlay" onClick={() => setDrawerOpen(false)} />
      )}

      <header className="header">
        <div className="headerLeft">
          <img src={logo} alt="XUO Logo" className="logo" />
        </div>

        {!isMobile && (
          <div className="searchBar">
            <input type="text" placeholder="Search..." />
            <FaSearch className="searchIcon" />
          </div>
        )}

        {isMobile && showSearch && (
          <div className="searchBar expanded">
            <input type="text" placeholder="Search..." autoFocus />
          </div>
        )}

        <div className="actionIcons">
          {!isMobile && (
            <>
              <FaFilter className="icon" />
              <FaPlus className="icon" />
              <div className="notificationIcon">
                <FaBell className="icon" />
                <span className="notificationBadge">3</span>
              </div>
              <FaCommentDots className="icon" />
              <img src={profilePic} alt="User avatar" className="avatar" />
            </>
          )}

          {isMobile && (
            <>
              <FaSearch
                className="icon searchToggle"
                onClick={() => setShowSearch((prev) => !prev)}
              />
              <FaBars
                className="icon hamburgerMenu"
                onClick={() => setDrawerOpen(true)}
              />
            </>
          )}
        </div>
      </header>

      {isMobile && (
        <div ref={drawerRef} className={`drawer ${drawerOpen ? "open" : ""}`}>
          <ul>
            <li>Início</li>
            <li>Vender</li>
            <li>Notificações</li>
            <li>Mensagens</li>
            <li>Profile</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
