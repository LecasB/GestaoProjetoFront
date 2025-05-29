import { useState, useEffect } from "react";

const LeiloesPage = () => {
  const [data, setData] = useState([]);

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
          <p>{item.descricao}</p>
          <p>{item.preco}</p>
          {item.imagem && item.imagem.map((obj, i) => (
              <img src={obj} alt="" />
            ))}
          <p>Começado dia: {item.dataInicio}</p>
          <p>Termina a: {item.dataFim}</p>
        </div>
      ))}
    </>
  );
};

export default LeiloesPage;
