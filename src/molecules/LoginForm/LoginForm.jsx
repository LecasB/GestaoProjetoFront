import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sucess, setSucess] = useState(false);
  const [data, setData] = useState(null);
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
    <div className="position-center">
      <div className="loginform">
        <img src="" alt="" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember mes</label>
          </div>
          <button type="submit">Login</button>
          <div>
            <Link>Forgot password</Link>
          </div>
        </form>
        <div>
          <p>If you don’t have an accout please</p>{" "}
          <Link to="/signup">create account</Link>
        </div>

        {sucess && (
          <div>
            <h1>Bem vindo {data.name}!</h1>
            <p onClick={() => navigate("/mensagens")}>
              Vá até às suas Mensagens
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
