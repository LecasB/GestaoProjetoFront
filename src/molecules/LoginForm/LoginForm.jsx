import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import XuoPng from "../../assets/xuo.png";
import XuoBackgroundVid from "../../assets/xuovideobg.mp4";
import ErrorToast from "../SingUpForm/ErrorToast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sucess, setSucess] = useState(false);
  const [data, setData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [toastErrors, setToastErrors] = useState([]);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("https://xuoapi.azurewebsites.net/api/v1/login", {
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
        sessionStorage.setItem("name", jsonData.name);
      }

      setSucess(true);

      navigate("/index");
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err.message);
      setToastErrors(["User não encontrado."]);
    }

    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="bg-loading">
          <div className="loader"></div>
        </div>
      )}
      <ErrorToast messages={toastErrors} onClose={() => setToastErrors([])} />
      <div className="cmp-login_container">
        <form className="cmp-login_container_form" onSubmit={handleSubmit}>
          <img src={XuoPng} alt="" className="cmp-login_container_form_logo" />
          <input
            type="text"
            placeholder="Email"
            className="cmp-login_container_form_textinput w-100" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="cmp-login_container_form_textinput w-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-100">
            <input
              type="checkbox"
              id="remember"
              className="cmp-login_container_form_checkbox"
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className="w-100">Login</button>
          <div className="w-100">
            <Link>Forgot password</Link>
          </div>
          <p>
            If you don’t have an accout please{" "}
            <Link to="/signup">create account</Link>
          </p>
        </form>

        <video autoPlay muted loop playsInline className="cmp-login_video-bg">
          <source src={XuoBackgroundVid} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default LoginForm;
