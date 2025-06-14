import React, { useEffect, useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(sessionStorage.getItem("id") || null);
  }, []);

  // Guarda o ficheiro diretamente, sem converter em base64
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Por favor, escolhe uma imagem antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("id", userId);
    formData.append("photo", selectedFile);
    console.log(formData);

    try {
      // Endpoint local (comenta e descomenta conforme necessário)
      //const response = await fetch("https://xuoapi.azurewebsites.net/api/v1/user/updateImage",{
      const response = await fetch(
        "http://localhost:3000/api/v1/user/updateImage",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Upload realizado com sucesso:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {userId && (
        <div className="file-upload">
          <input type="file" id="file" onChange={handlePhoto} />
          <label htmlFor="file">Upload File</label>
          <button onClick={handleSubmit}>Save</button>
        </div>
      )}
    </>
  );
};

export default FileUpload;
