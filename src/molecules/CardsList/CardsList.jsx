import { useEffect, useState } from "react";
import CardItem from "../../atoms/CardItem/CardItem";
import "./CardsList.scss";
const CardsList = ({ id }) => {
  const user = JSON.parse(localStorage.getItem(""));

  const [items, setItems] = useState([]);

  const getItems = async (id) => {
    try {
      const resposta = await fetch(
        id
          ? `https://xuoapi.azurewebsites.net/api/v1/items/user/${id}`
          : `https://xuoapi.azurewebsites.net/api/v1/items`
      );
      setItems(await resposta.json());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) getItems(id);
    else getItems();
  }, [id]);

  return (
    <>
      <div className="conjunto-cards">
        {items.map((item, key) => (
          <CardItem
            key={key}
            id={item._id}
            image={item.images[0]}
            price={item.price}
            name={item.title}
          />
        ))}
      </div>
    </>
  );
};

export default CardsList;
