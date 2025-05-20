import { Outlet } from "react-router";
import "./BackendLayout.scss";
import { FaBell } from "react-icons/fa";

const BackendLayout = () => {
  return (
    <div className="cmp-bo-layout">
      <div
        style={{ width: "100vw", height: "80px" }}
        className="cmp-bo-layout__topbar"
      >
        <img
          style={{ height: "70px", width: "150px" }}
          src="https://cdn.discordapp.com/attachments/1179520343724007576/1339722496206966897/2__1_-removebg.png?ex=682da88d&is=682c570d&hm=a7d0bfa6049ebc21ffeaefd472779a9599ad5c5f8cb7e983d3efd109100f56ad&"
          alt=""
          srcset=""
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            boxSizing: "border-box"
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
          <p className="cmp-bo-layout__sidebar__item">Gerir Items</p>
          <p className="cmp-bo-layout__sidebar__item">Gerir Categorias</p>
          <p className="cmp-bo-layout__sidebar__item">Gerir Users</p>
        </div>
        <div className="Content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BackendLayout;
