import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import FileUploaderComplex from "../../atoms/FileUploaderComplex/FileUploaderComplex";

const EditItemPage = () => {
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get("id");
  const [data, setData] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]); // pré-carregadas
  const [newImages, setNewImages] = useState([]); // novas

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  useEffect(() => {
    if (itemId) {
      fetchItemData();
    }
  }, [itemId]);

  const fetchItemData = async () => {
    try {
      const response = await fetch(
        `https://xuoapi.azurewebsites.net/api/v1/items/${itemId}`
      );
      const data = await response.json();
      setData(data);
      setTitle(data.title || "");
      setDescription(data.description || "");
      setCondition(data.condition || "");
      setPrice(data.price || 0);
      setImages(data.images || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewImages = (files) => {
    const totalImages = images.length + newImages.length;
    const availableSlots = 3 - totalImages;

    if (availableSlots <= 0) return;

    const filesToAdd = files.slice(0, availableSlots);
    setNewImages((prev) => [...prev, ...filesToAdd]);
  };

  const handleSubmit = () => {
    const updatedItem = {
      title,
      description,
      condition,
      price,
      // images são tratadas separadamente
    };

    console.log("Submitting item:", updatedItem);
    console.log("New images to upload:", newImages);
  };

  return (
    <div>
      <h1>Edit Item Page</h1>
      <InputText
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="mb-2"
      />
      <InputTextarea
        maxLength={100}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        cols={30}
        className="mb-2"
        placeholder="Descrição"
      />
      <Dropdown
        value={condition}
        onChange={(e) => setCondition(e.value)}
        options={cities}
        optionLabel="name"
        placeholder="Condição"
        className="w-full md:w-14rem mb-2"
      />
      <InputNumber
        inputId="currency-germany"
        value={price}
        onValueChange={(e) => setPrice(e.value)}
        mode="currency"
        currency="EUR"
        locale="de-DE"
        className="mb-2"
      />
      <FileUploaderComplex
        images={images}
        onNewImages={handleNewImages}
        currentCount={images.length + newImages.length}
        maxImages={3}
      />
      <Button label="Submit" onClick={handleSubmit} className="mt-3" />
    </div>
  );
};

export default EditItemPage;
