import ImageCarrousel from "../atoms/ImageCarrousel/ImageCarrousel";
import "./ItemDetailPage.scss";
import UserMiniProfileItem from "../atoms/UserMiniProfileItem/UserMiniProfileItem";
import ReportButton from "../atoms/ReportButton/ReportButton";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ItemDetailPage = () => {
  const [itemDetails, setItemDetails] = useState("");
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get("itemId")
    ? searchParams.get("itemId")
    : "6827c531cd393c9e354013c5";

  const getItemDetails = async () => {
    await fetch(`https://xuoapi.vercel.app/api/v1/items/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItemDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  };

  useEffect(() => {
    getItemDetails();
  }, []);
  return (
    <div className="cmp-item-detail-page">
      {itemDetails && (
        <div className="cmp-item-detail-page__item-detail">
          <div>
            <ImageCarrousel images={itemDetails.images} />
            <UserMiniProfileItem />
          </div>
          <div className="cmp-item-detail-page__item-detail--description">
            <h1>{itemDetails.title}</h1>
            <p>{itemDetails.description}</p>
            <div className="cmp-item-detail-page__item-detail--description--price-and-report">
              <b>{itemDetails.price}€</b>
              <ReportButton />
            </div>
            <div className="cmp-item-detail-page__item-detail--description--buttons">
              <button className="cmp-item-detail-page__item-detail--description--buttons--btn_primary">
                Comprar
              </button>
              <button className="cmp-item-detail-page__item-detail--description--buttons--btn_secondary">
                Negociar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;
