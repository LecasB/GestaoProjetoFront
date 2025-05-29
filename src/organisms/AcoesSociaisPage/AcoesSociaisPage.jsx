import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        <Link
          key={key}
          to={`/acao-social?id=${item._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <SocialActionCard
            image={item.images[0]}
            titulo={item.title}
            categorias={item.objetivos}
          />
        </Link>
      ))}
    </div>
  );
};

export default AcoesSociaisPage;
