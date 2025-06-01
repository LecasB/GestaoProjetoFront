import { useState, useEffect } from "react";
import ItemImagesUpload from "./ItemImagesUpload";
import "./UploadItemPage.scss";

const UploadItemPage = () => {
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("new");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) setUserId(id);
  }, []);

  const handleSubmit = async () => {
    if (!userId) {
      alert("Utilizador não autenticado.");
      return;
    }

    if (!title || !description || !condition || !price || images.length === 0) {
      alert("Preenche todos os campos e seleciona até 3 imagens.");
      return;
    }

    const formData = new FormData();
    formData.append("idseller", userId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("condition", condition);
    formData.append("price", price);
    formData.append("visibility", "onsale");

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(
        "https://xuoapi.azurewebsites.net/api/v1/newItem",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Item enviado com sucesso:", data);
      alert("Item enviado com sucesso!");

      // Limpar formulário
      setTitle("");
      setDescription("");
      setCondition("new");
      setPrice("");
      setImages([]);
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar item.");
    }
  };

  return (
    <div className="cmp-uploaditemform_container">
      <form
        className="cmp-uploaditemform_container_form"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select
          name="estado"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="new">New</option>
          <option value="refurbished">Refurbished</option>
          <option value="used">Used</option>
          <option value="broken">Broken</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            width: "100%",
            height: "56px",
            background: "#373737",
            color: "#a59c9c",
            border: "none",
            padding: "0 16px",
            fontSize: "16px",
            borderRadius: "4px",
          }}
        />
        <ItemImagesUpload onImagesSelected={setImages} />
        <button type="button" onClick={handleSubmit}>
          Enviar Item
        </button>
      </form>
    </div>
  );
};

export default UploadItemPage;
