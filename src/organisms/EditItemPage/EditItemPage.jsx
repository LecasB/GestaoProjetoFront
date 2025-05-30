import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { FaRegTrashAlt } from "react-icons/fa";
import "./EditItemPage.scss";

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
    { name: "Used", code: "used" },
    { name: "New", code: "new" },
    { name: "Refurbished", code: "refurbished" },
    { name: "Broken", code: "broken" },
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

  const handleRemove = (fileName) => {
    setImages((prev) => prev.filter((f) => f !== fileName));
    console.log("Removed image:", fileName, "Current images:", images);
  };

  const handleSubmit = () => {
    const updatedItem = {
      title,
      description,
      condition,
      price,
    };

    console.log("Submitting item:", updatedItem);
    console.log("New images to upload:", newImages);
  };

  return (
    <div className="editItem">
      <h1>Edit Item Page</h1>
      <form>
        <div>
          <InputText
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="mb-2"
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
        </div>
        <InputTextarea
          maxLength={100}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={10}
          cols={70}
          className="mb-2"
          placeholder="Descrição"
        />
        {images.length > 0 && (
          <div className="mt-4">
            <h5>Imagens Recebidas</h5>
            {images.map(
              (file) => (
                console.log(file),
                (
                  <div key={file} className="img-div">
                    <img src={file} alt={""} width={100} className="mr-3" />
                    <div className="delete-btn">
                      <FaRegTrashAlt onClick={() => handleRemove(file)} />
                    </div>
                  </div>
                )
              )
            )}
          </div>
        )}
        <Button label="Submit" onClick={handleSubmit} className="mt-3" />
      </form>
    </div>
  );
};

export default EditItemPage;
