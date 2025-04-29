import { useState } from "react";
import reactLogo from "./assets/react.svg";
import xuoLogo from "./assets/xuo.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <img src={xuoLogo} className="logo" alt="Vite logo" />
      </div>
      <h1>Best Market Place 🚫 🧢</h1>
      <a href="https://xuoapi.vercel.app/">
        <marquee behavior="scroll" direction="left" scrollamount="10">
          Aceda a API aqui!
        </marquee>
      </a>
    </>
  );
}

export default App;
