import { useState, useEffect } from "react";
import ItemImagesUpload from "./ItemImagesUpload";
import "./UploadItemPage.scss"

const UploadItemPage = () => {
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) setUserId(id);
  }, []);

  const handleSubmit = async () => {
    if (!userId) {
      alert("Utilizador não autenticado.");
      return;
    }

    const title = document.querySelector('input[placeholder="title"]').value;
    const description = document.querySelector(
      'textarea[name="description"]'
    ).value;
    const condition = document.querySelector('select[name="estado"]').value;
    const price = document.querySelector('input[placeholder="price"]').value;

    if (!title || !description || !condition || !price || images.length === 0) {
      alert("Preenche todos os campos e seleciona até 3 imagens.");
      return;
    }

    const formData = new FormData();
    formData.append("idseller", sessionStorage.getItem("id"));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("condition", condition);
    formData.append("price", price);
    formData.append("visibility", "onsale"); // ou permitir escolher no formulário

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

      // Opcional: limpar os campos
      document.querySelector('input[placeholder="title"]').value = "";
      document.querySelector('textarea[name="description"]').value = "";
      document.querySelector('select[name="estado"]').value = "new";
      document.querySelector('input[placeholder="price"]').value = "";
      setImages([]);
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar item.");
    }
  };

  return (
   <div className="upload-item-container">
    <div className="form-card">
      <input type="text" placeholder="title" />
      <textarea name="description" placeholder="description"></textarea>
      <select name="estado">
        <option value="new">New</option>
        <option value="refurbished">Refurbished</option>
        <option value="used">Used</option>
        <option value="broken">Broken</option>
      </select>
      <input type="price" placeholder="price" />

      <div className="image-upload">
        <ItemImagesUpload onImagesSelected={setImages} />
      </div>

      <button onClick={handleSubmit}>Enviar Item</button>
    </div>
  </div>
);
};

export default UploadItemPage;
