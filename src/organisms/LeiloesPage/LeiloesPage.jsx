import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeilaoCard from "../../atoms/LeilaoCard/LeilaoCard";

const LeiloesPage = () => {
  const [data, setData] = useState([]);

  function formatDateString(isoDate) {
    return isoDate.split("T")[0];
  }

  useEffect(() => {
    fetch("https://xuoapi.azurewebsites.net/api/v1/leilao")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Erro ao carregar dados:", err));
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {data.map((item, key) => (
        <Link
          key={key}
          to={`/leilao?id=${item._id}`} // <- usando search param
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <LeilaoCard
            descricao={item.descricao}
            dataInicio={formatDateString(item.dataInicio)}
            dataFim={formatDateString(item.dataFim)}
            imagem={item.imagem[0]}
            preco={item.preco}
          />
        </Link>
      ))}
    </div>
  );
};

export default LeiloesPage;
