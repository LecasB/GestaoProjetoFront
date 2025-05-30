import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import "./AcaoSocialDetails.scss";

const AcaoSocialDetails = () => {
  const [searchParams] = useSearchParams();
  const [action, setAction] = useState(null);

  const actionId = searchParams.get("id");

  useEffect(() => {
    if (!actionId) return;

    fetch(`https://xuoapi.azurewebsites.net/api/v1/acoes-sociais/${actionId}`)
      .then((res) => res.json())
      .then((json) => setAction(json))
      .catch((err) => console.error("Erro ao buscar ação:", err));
  }, [actionId]);

  return (
    <div className="acao-social-details">
      {action ? (
        <>
          <h1>{action.title}</h1>
          <div className="image-container">
            <img src={action.images[0]} alt={action.title} />
          </div>
          <p className="description">{action.description}</p>
          <div className="tags">
            {action.objetivos?.map((tag, index) => (
              <span className="tag" key={index}>
                {tag}
              </span>
            ))}
          </div>
          <Button label="Fazer oferta"></Button>
        </>
      ) : (
        <p>A carregar...</p>
      )}
    </div>
  );
};

export default AcaoSocialDetails;
