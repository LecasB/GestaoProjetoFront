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
      <img src="https://media.discordapp.net/attachments/1097462881773174814/1366183231497699358/a1e2aaad-b6ff-4e82-b944-cbb80117c0e4-small.png?ex=68115648&is=681004c8&hm=14afcd96b8df08ac9f30974e1f6e23fd1210ff15942841aaece37598bb5dd8cf&=&format=webp&quality=lossless&width=712&height=400" alt="" srcset="" />
      <a href="https://xuoapi.vercel.app/">
        <marquee behavior="scroll" direction="left" scrollamount="10">
          Aceda a API aqui!
        </marquee>
      </a>
    </>
  );
}

export default App;
