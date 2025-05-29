import { useState, useEffect } from "react";
import SocialActionCard from "../../atoms/SocialCardAction/SocialCardAction";

const AcoesSociaisPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://xuoapi.azurewebsites.net/api/v1/acoes-sociais")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Erro ao carregar dados:", err));
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {data.map((item, key) => (
        <div key={key}>
          <SocialActionCard
            image={item.images[0]}
            titulo={item.title}
            categorias={item.objetivos}
          />
        </div>
      ))}
    </div>
  );
};

export default AcoesSociaisPage;
