import { useState } from "react";

const ItemImagesUpload = ({ onImagesSelected }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handlePhoto = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + selectedFiles.length > 3) {
      alert("Podes fazer upload de no máximo 3 imagens.");
      return;
    }

    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);
    onImagesSelected(newFiles); // envia para o componente pai
  };

  const removeImage = (indexToRemove) => {
    const newFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFiles(newFiles);
    onImagesSelected(newFiles); // atualiza no pai
  };

  return (
    <div className="item-images-upload">
      <input
        type="file"
        accept="image/*"
        multiple
        name="images"
        onChange={handlePhoto}
        disabled={selectedFiles.length >= 3}
      />
      <div>
        {selectedFiles.map((file, index) => (
          <div key={index}>
            {file.name}
            <button type="button" onClick={() => removeImage(index)}>
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemImagesUpload;
