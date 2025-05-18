import { useEffect, useState } from "react";
import CardItem from "../../atoms/CardItem/CardItem"
import "./CardsList.scss";
const CardsList = () => {
  const user = JSON.parse(localStorage.getItem(""));

    const [items,setItems] = useState([])

    useEffect(()=>{
        getItems();
    },[]
    )

    const getItems = async () => {
      try {
        const resposta = await fetch("https://xuoapi.vercel.app/api/v1/items");
        setItems(await resposta.json());
      } catch (error) {
        console.error(error);
      }
    };


  return (
    <>
      <h2 className="recomendados">Recomendados</h2>

      <div className="conjunto-cards">
        {items.map((item,key)=>(
            <CardItem image={item.images[0]} price={item.price} name={item.title} />
        ))}
      </div>
      
    </>
  );
};

export default CardsList;
