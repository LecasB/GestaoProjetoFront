import React, { useEffect, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

export default function AdvanceDemo({ images = [] }) {
  const [preloadedFiles, setPreloadedFiles] = useState([]);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    const preloaded = images.map((url, index) => ({
      name: `image-${index}.jpg`,
      objectURL: url,
      size: 0, // ou qualquer valor fictício
      type: "image/jpeg",
    }));
    setPreloadedFiles(preloaded);
    setTotalSize(0); // não sabemos o tamanho real sem fetch
  }, [images]);

  const handleRemove = (fileName) => {
    setPreloadedFiles((prev) => {
      const updated = prev.filter((f) => f.name !== fileName);
      setTotalSize(updated.reduce((acc, f) => acc + f.size, 0));
      return updated;
    });
  };

  return (
    <div className="card">
      <FileUpload
        name="demo[]"
        url="/api/upload"
        multiple
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={
          <p className="m-0">Arraste e largue imagens aqui para carregar.</p>
        }
      />

      {/* Mostrar imagens já existentes (pre-carregadas) */}
      {preloadedFiles.length > 0 && (
        <div className="mt-4">
          <h5>Imagens Recebidas</h5>
          {preloadedFiles.map((file) => (
            <div key={file.name} className="flex align-items-center my-2">
              <img
                src={file.objectURL}
                alt={file.name}
                width={100}
                className="mr-3"
              />
              <div className="flex flex-column mr-3">
                <span>{file.name}</span>
                <small>{Math.round(file.size / 1024)} KB</small>
              </div>
              <Tag value="preloaded" severity="info" className="mr-2" />
              <Button
                icon="pi pi-times"
                className="p-button-danger p-button-rounded p-button-outlined"
                onClick={() => handleRemove(file.name)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
