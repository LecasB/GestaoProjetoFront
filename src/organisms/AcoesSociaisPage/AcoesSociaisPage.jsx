import { useState, useEffect } from "react";

const AcoesSociaisPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://xuoapi.azurewebsites.net/api/v1/acoes-sociais")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Erro ao carregar dados:", err));
  }, []);

  return (
    <>
      {data.map((item, key) => (
        <div key={key}>
          <p>{item.title}</p>
          <p>{item.description}</p>
          <p>{item.associacao}</p>
          {item.images && item.images.map((obj, i) => (
              <img src={obj} alt="" />
            ))}
          <ul>
            {item.objetivos && item.objetivos.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default AcoesSociaisPage;
