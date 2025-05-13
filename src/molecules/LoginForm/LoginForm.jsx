import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import XuoPng from "../../assets/xuo.png";
import XuoBackgroundVid from "../../assets/xuovideobg.mp4";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sucess, setSucess] = useState(false);
  const [data, setData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("https://xuoapi.vercel.app/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const jsonData = await res.json();

      setData(jsonData);

      if (jsonData.id) {
        sessionStorage.setItem("id", jsonData.id);
      }

      setSucess(true);

      console.log("Response Boa!:", res);
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
    }
  };

  return (
    <div className="cmp-login_container">
      <form className="cmp-login_container_form" onSubmit={handleSubmit}>
        <img src={XuoPng} alt="" className="cmp-login_container_form_logo" />
        <input
          type="text"
          placeholder="Email"
          className="cmp-login_container_form_textinput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="cmp-login_container_form_textinput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <input
            type="checkbox"
            id="remember"
            className="cmp-login_container_form_checkbox"
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit">Login</button>
        <div>
          <Link>Forgot password</Link>
        </div>
        <p>
          If you don’t have an accout please{" "}
          <Link to="/signup">create account</Link>
        </p>{" "}
        {sucess && (
          <div>
            <h1>Bem vindo {data.name}!</h1>
            <p onClick={() => navigate("/mensagens")}>
              Vá até às suas Mensagens
            </p>
          </div>
        )}
      </form>

      <video autoPlay muted loop playsInline className="cmp-login_video-bg">
        <source src={XuoBackgroundVid} type="video/mp4" />
      </video>
    </div>
  );
};

export default LoginForm;
