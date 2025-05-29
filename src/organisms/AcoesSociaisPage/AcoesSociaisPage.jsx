import { useState, useEffect } from "react";
import SocialActionCard from "../../atoms/SocialCardAction/SocialCardAction"

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
          <SocialActionCard image={item.images[0]} titulo={item.title} categorias={item.objetivos}/>
        </div>
      ))}
    </>
  );
};

export default AcoesSociaisPage;
