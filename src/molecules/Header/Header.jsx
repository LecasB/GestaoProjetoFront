import React, { useState, useEffect, use } from "react";
import "./Header.scss";
import {
  FaSearch,
  FaPlus,
  FaBell,
  FaCommentDots,
  FaFilter,
} from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { HiMenuAlt1 } from "react-icons/hi";
import logo from "../../../public/imgs/xuo.png";
import profilePic from "../../../public/imgs/ronaldo.jpg";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState(() => {
    return sessionStorage.getItem("id") !== null;
  });
  const [userDetails, setUserDetails] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);
  const [showSearch, setShowSearch] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [closingDrawer, setClosingDrawer] = useState(false);
  const [closingSearch, setClosingSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleUserInfo();
    const handleResize = () => setIsMobile(window.innerWidth <= 430);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDrawerClose = () => {
    setClosingDrawer(true);
    setTimeout(() => {
      setDrawerOpen(false);
      setClosingDrawer(false);
    }, 300);
  };

  const handleUserInfo = async () => {
    isLogin
      ? await fetch(
          `https://xuoapi.azurewebsites.net/api/v1/user/${sessionStorage.getItem(
            "id"
          )}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setUserDetails(data);
          })
          .catch((error) => {
            console.error("Error fetching item details:", error);
          })
      : "";
  };

  const handleSearchClose = () => {
    setClosingSearch(true);
    setTimeout(() => {
      setShowSearch(false);
      setClosingSearch(false);
    }, 300);
  };

  return (
    <>
      <div className="headerWrapper">
        {isMobile && showSearch ? (
          <div className={`mobileSearchHeader ${closingSearch ? "hide" : ""}`}>
            <div className="searchWrapper">
              <input type="text" placeholder="Pesquisar..." autoFocus />
              <div className="iconsRight">
                <FaSearch className="searchIcon" />
                <FaFilter className="filterIcon" />
              </div>
            </div>
            <RxCrossCircled
              className="closeSearchIcon"
              onClick={handleSearchClose}
            />
          </div>
        ) : (
          <header className="header">
            <div className="headerLeft">
              {isMobile ? (
                <div
                  className="circleButton small"
                  onClick={() => setDrawerOpen(true)}
                >
                  <HiMenuAlt1 />
                </div>
              ) : (
                <img
                  src={logo}
                  alt="XUO Logo"
                  className="logo"
                  onClick={() => navigate("/index")}
                />
              )}
            </div>

            {!isMobile && (
              <div className="searchBar">
                <input type="text" placeholder="Pesquisar..." />
                <FaSearch className="searchIcon" />
                <FaFilter className="filterIcon" />
              </div>
            )}

            <div className="headerRight">
              {isMobile ? (
                <FaSearch
                  className="icon searchToggle"
                  onClick={() => setShowSearch(true)}
                />
              ) : (
                <div className="actionIcons">
                  <Link to="/newItem" className="messagesIcon">
                    <FaPlus className="icon" />
                  </Link>
                  <div className="notificationIcon">
                    <FaBell className="icon" />
                  </div>
                  <Link to="/mensagens" className="messagesIcon">
                    <FaCommentDots className="icon" />
                  </Link>
                  <Link
                    to={isLogin ? "/profile" : "/login"}
                    className="messagesIcon"
                  >
                    <img
                      src={
                        isLogin
                          ? userDetails.image
                          : "https://i.ibb.co/chLJhfGz/default-icon.jpg"
                      }
                      alt="User avatar"
                      className="avatar"
                    />
                  </Link>
                </div>
              )}
              {isMobile && <img src={logo} alt="XUO Logo" className="logo" />}
            </div>
          </header>
        )}
      </div>

      {isMobile && drawerOpen && (
        <div className="drawerOverlay" onClick={handleDrawerClose} />
      )}

      {isMobile && (
        <div
          className={`drawer ${drawerOpen ? "open" : ""} ${
            closingDrawer ? "closing" : ""
          }`}
        >
          <div className="drawerHeader">
            <div
              className="circleButton large closeButton"
              onClick={handleDrawerClose}
            >
              <RxCrossCircled className="drawerCloseIcon" />
            </div>
            <img src={logo} alt="XUO Logo" className="drawerLogo" />
          </div>
          <ul>
            <li>Início</li>
            <li>Vender</li>
            <li>Notificações</li>
            <li>Mensagens</li>
            <li>Perfil</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
