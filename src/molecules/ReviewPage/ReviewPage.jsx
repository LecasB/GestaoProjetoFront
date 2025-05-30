import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; 

const ReviewPage = ({ nome }) => {
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState(null);
  const [vendorId, setVendorId] = useState("");
  const [searchParams] = useSearchParams();


  const id = searchParams.get("id");


  useEffect(() => {
    if (id) {
      fetch(`https://xuoapi.azurewebsites.net/api/v1/user/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user data");
          return res.json();
        })
        .then((data) => {
          setVendorId(data._id); 
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleNewReview = async () => {
    if (!vendorId) {
      console.error("Vendor ID is not set yet.");
      return;
    }
    const reviewData = {
      idUser: sessionStorage.getItem("id"),
      idVendor: vendorId,
      rate: number,
      descricao: description,
    };

    try {
      const response = await fetch(`https://xuoapi.azurewebsites.net/api/v1/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Review submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <h2>Avalie o Utilizador {nome}</h2>
      <InputNumber
        min={1}
        max={5}
        placeholder="1-5"
        value={number}
        onChange={(e) => setNumber(e.value)}
      />
      <InputText
        placeholder="descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleNewReview} label="Submit" />
    </>
  );
};

export default ReviewPage;
