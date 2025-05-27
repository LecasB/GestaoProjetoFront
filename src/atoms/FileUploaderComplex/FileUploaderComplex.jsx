import { useEffect, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

export default function FileUploaderComplex({
  images = [],
  onNewImages,
  maxImages = 3,
  currentCount = 0,
}) {
  const [preloadedFiles, setPreloadedFiles] = useState([]);

  useEffect(() => {
    const preloaded = images.map((url, index) => ({
      name: `image-${index}.jpg`,
      objectURL: url,
      size: 0,
      type: "image/jpeg",
    }));
    setPreloadedFiles(preloaded);
  }, [images]);

  const handleUpload = (event) => {
    const incomingFiles = event.files;
    const remainingSlots = maxImages - currentCount;

    if (remainingSlots <= 0) {
      return;
    }

    const filesToSend = incomingFiles.slice(0, remainingSlots);

    const preparedFiles = filesToSend.map((file) => ({
      file,
      objectURL: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    if (onNewImages) {
      onNewImages(preparedFiles.map((f) => f.file));
    }
  };

  const handleRemove = (fileName) => {
    setPreloadedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  return (
    <div className="card">
      <FileUpload
        name="demo[]"
        customUpload
        uploadHandler={handleUpload}
        multiple
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={
          <p className="m-0">Arraste e largue imagens aqui para carregar.</p>
        }
      />

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
