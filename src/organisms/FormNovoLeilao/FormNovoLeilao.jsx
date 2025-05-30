import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormNovoLeilao.scss";
import XuoPng from "../../assets/xuo.png";
import XuoBackgroundVid from "../../assets/xuovideobg.mp4";
import ErrorToast from "../../molecules/SingUpForm/ErrorToast";

const FormNovoLeilao = () => {
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [images, setImages] = useState([]);
  const [toastErrors, setToastErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getNowLocalISOString = () => {
    return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToastErrors([]);
    setLoading(true);

    const idUser = sessionStorage.getItem("id");

    if (!idUser) {
      setToastErrors(["Utilizador não autenticado."]);
      setLoading(false);
      return;
    }

    try {
      const now = new Date();
      const start = new Date(dataInicio);
      const end = new Date(dataFim);
      const minEnd = new Date(now.getTime() + 5 * 60000);

      if (start < now) {
        setToastErrors(["A data de início não pode ser no passado."]);
        setLoading(false);
        return;
      }

      if (end < minEnd) {
        setToastErrors([
          "A data de fim deve ser pelo menos 5 minutos após o momento atual.",
        ]);
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("descricao", descricao);
      formData.append("preco", preco);
      formData.append("idUser", idUser);
      formData.append("idVendedor", idUser);
      formData.append("estado", "open");
      formData.append("dataInicio", start.toISOString());
      formData.append("dataFim", end.toISOString());
      images.forEach((img) => formData.append("images", img));

      const response = await fetch(
        "https://xuoapi.azurewebsites.net/api/v1/leilao",
        {
          method: "POST",
          body: formData,
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setToastErrors([json.message || "Erro ao criar leilão."]);
        setLoading(false);
        return;
      }

      navigate("/leiloes");
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
      <div className="cmp-leilaoform_container">
        <form className="cmp-leilaoform_container_form" onSubmit={handleSubmit}>
          <img
            src={XuoPng}
            alt="Xuo"
            className="cmp-leilaoform_container_form_logo"
          />
          <input
            type="text"
            placeholder="Descrição"
            className="cmp-leilaoform_container_form_textinput"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Preço base (€)"
            className="cmp-leilaoform_container_form_textinput"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            className="cmp-leilaoform_container_form_textinput"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            min={getNowLocalISOString()}
            required
          />
          <input
            type="datetime-local"
            className="cmp-leilaoform_container_form_textinput"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            min={getNowLocalISOString()}
            required
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
            required
          />
          <button type="submit">Criar leilão</button>
        </form>

        <video
          autoPlay
          muted
          loop
          playsInline
          className="cmp-leilaoform_video-bg"
        >
          <source src={XuoBackgroundVid} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default FormNovoLeilao;
