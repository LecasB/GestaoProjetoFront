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
  const [images, setImages] = useState([]);

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  useEffect(() => {
    if (itemId) {
      func();
    }
  }, [itemId]);

  const func = async () => {
    await fetch(`https://xuoapi.azurewebsites.net/api/v1/items/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setTitle(data.title || "");
        setDescription(data.description || "");
        setCondition(data.condition || "");
        setPrice(data.price || 0);
        setImages(data.images || []);
      })
      .catch(console.error);
  };

  const handleSubmit = () => {
    const updatedItem = { title, description, condition, price };
    console.log("Submitting item:", updatedItem);
  };

  return (
    <div>
      <h1>Edit Item Page</h1>
      <InputText value={title} onChange={(e) => setTitle(e.target.value)} />
      <InputTextarea
        maxLength={100}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        cols={30}
      />
      <Dropdown
        value={condition}
        onChange={(e) => setCondition(e.value)}
        options={cities}
        optionLabel="name"
        placeholder="Condition"
        className="w-full md:w-14rem"
      />
      <InputNumber
        inputId="currency-germany"
        value={price}
        onValueChange={(e) => setPrice(e.value)}
        mode="currency"
        currency="EUR"
        locale="de-DE"
      />
      <FileUploaderComplex images={images} />
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default EditItemPage;
