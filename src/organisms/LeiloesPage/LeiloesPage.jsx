import { useState, useEffect } from "react";
import LeilaoCard from "../../atoms/LeilaoCard/LeilaoCard";

const LeiloesPage = () => {
  const [data, setData] = useState([]);

  function formatDateString(isoDate) {
    const dateOnly = isoDate.split("T")[0]; 
    return dateOnly
  }

  useEffect(() => {
    fetch("https://xuoapi.azurewebsites.net/api/v1/leilao")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Erro ao carregar dados:", err));
  }, []);

  return (
    <>
      {data.map((item, key) => (
        <div key={key}>
          <LeilaoCard descricao={item.descricao} dataInicio={formatDateString(item.dataInicio)} dataFim={formatDateString(item.dataFim)} imagem={item.imagem[0]} preco={item.preco} />
        </div>
      ))}
    </>
  );
};

export default LeiloesPage;
