import { Outlet, useNavigate } from "react-router";
import "./BackendLayout.scss";
import { FaBell } from "react-icons/fa";

const BackendLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="cmp-bo-layout">
      <div
        style={{ width: "100vw", height: "80px", padding: "20px" }}
        className="cmp-bo-layout__topbar"
      >
        <img
          style={{ height: "70px", width: "150px" }}
          src="https://i.ibb.co/V0gYSfsk/2-1-removebg.png"
          alt=""
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          <FaBell style={{ color: "white", fontSize: "25px" }} />
          <img
            src={"https://i.ibb.co/chLJhfGz/default-icon.jpg"}
            style={{ height: "40px", width: "40px", borderRadius: "50%" }}
            alt="User avatar"
            className="avatar"
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            height: "calc(100vh - 80px)",
            width: "200px",
          }}
          className="cmp-bo-layout__sidebar"
        >
          <p
            className="cmp-bo-layout__sidebar__item"
            onClick={() => {
              navigate("gerirItems");
            }}
          >
            Gerir Items
          </p>
          <p
            className="cmp-bo-layout__sidebar__item"
            onClick={() => navigate("gerirUsers")}
          >
            Gerir Users
          </p>
        </div>
        <div className="Content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BackendLayout;
