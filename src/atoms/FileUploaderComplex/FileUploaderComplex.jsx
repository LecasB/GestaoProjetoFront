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
    </div>
  );
}
