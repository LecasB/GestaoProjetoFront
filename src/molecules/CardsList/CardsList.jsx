import { useEffect, useState } from "react";
import CardItem from "../../atoms/CardItem/CardItem";
import "./CardsList.scss";

const CardsList = ({ id, filters, numOfResults }) => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      let baseUrl = "https://xuoapi.azurewebsites.net/api/v1/items";
      let url = "";

      if (id) {
        url = `${baseUrl}/user/${id}`; 
      } else {
        url = filters ? `${baseUrl}?${filters}` : baseUrl;
      }

      console.log("Fetching URL:", url);

      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Erro ao buscar os items:", error);
    }
  };

  useEffect(() => {
    getItems();
  }, [id, filters]);

  useEffect(() => {
    if (typeof numOfResults === "function") {
      numOfResults(items.length);
    }
  }, [items, numOfResults]);

  return (
    <div className="conjunto-cards">
      {items.map((item) => (
        <CardItem
          key={item._id}
          id={item._id}
          image={item.images[0]}
          price={item.price}
          name={item.title}
        />
      ))}
    </div>
  );
};

export default CardsList;
