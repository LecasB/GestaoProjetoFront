import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormNovaAcaoSocial.scss";
import XuoPng from "../../assets/xuo.png";
import XuoBackgroundVid from "../../assets/xuovideobg.mp4";
import ErrorToast from "../../molecules/SingUpForm/ErrorToast";

const FormNovaAcaoSocial = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [associacao, setAssociacao] = useState("");
  const [objetivos, setObjetivos] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastErrors, setToastErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToastErrors([]);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("associacao", associacao);
      formData.append("objetivos", objetivos);
      images.forEach((img) => formData.append("images", img));

      const response = await fetch("https://xuoapi.azurewebsites.net/api/v1/acoes-sociais", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        setToastErrors([json.message || "Erro ao criar ação social."]);
        setLoading(false);
        return;
      }

      navigate("/acoes-sociais");
    } catch (error) {
      console.error("Erro:", error);
      setToastErrors(["Erro ao enviar dados."]);
    }

    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="bg-loading">
          <div className="loader"></div>
        </div>
      )}
      <ErrorToast messages={toastErrors} onClose={() => setToastErrors([])} />
      <div className="cmp-socialform_container">
        <form className="cmp-socialform_container_form" onSubmit={handleSubmit}>
          <img src={XuoPng} alt="Xuo" className="cmp-socialform_container_form_logo" />
          <input
            type="text"
            placeholder="Título"
            className="cmp-socialform_container_form_textinput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descrição"
            className="cmp-socialform_container_form_textinput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Associação"
            className="cmp-socialform_container_form_textinput"
            value={associacao}
            onChange={(e) => setAssociacao(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Objetivos (separados por vírgula)"
            className="cmp-socialform_container_form_textinput"
            value={objetivos}
            onChange={(e) => setObjetivos(e.target.value)}
            required
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
            required
          />
          <button type="submit">Criar ação social</button>
        </form>

        <video autoPlay muted loop playsInline className="cmp-socialform_video-bg">
          <source src={XuoBackgroundVid} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default FormNovaAcaoSocial;
