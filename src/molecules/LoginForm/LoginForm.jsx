import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
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
        <button type="submit">Login</button>
      </form>

      {sucess && (
        <div>
          <h1>Bem vindo {data.name}!</h1>
          <p onClick={() => navigate("/mensagens")}>Vá até às suas Mensagens</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
