import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeilaoCard from "../../atoms/LeilaoCard/LeilaoCard";
import "./LeiloesPage.scss"

const LeiloesPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://xuoapi.azurewebsites.net/api/v1/leilao")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Erro ao carregar dados:", err));
  }, []);

  return (
    <div className="leilao-list">
      {data.map((item, key) => (
        <Link
          key={key}
          to={`/leilao?id=${item._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <LeilaoCard
            descricao={item.descricao}
            dataInicio={item.dataInicio}
            dataFim={item.dataFim}
            imagem={item.imagem[0]}
            preco={item.preco}
          />
        </Link>
      ))}
    </div>
  );
};

export default LeiloesPage;
