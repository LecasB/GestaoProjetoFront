import ImageCarrousel from "../atoms/ImageCarrousel/ImageCarrousel";
import "./ItemDetailPage.scss";
import UserMiniProfileItem from "../atoms/UserMiniProfileItem/UserMiniProfileItem";
import ReportButton from "../atoms/ReportButton/ReportButton";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PopupConfirmation from "../atoms/PopupConfirmation/PopupConfirmation"

const ItemDetailPage = () => {
  const [itemDetails, setItemDetails] = useState("");
  const [buyPopup, setBuyPopup] = useState(false);
  const [searchParams] = useSearchParams();
  const [tipoCompra, setTipoCompra] = useState("");
  const itemId = searchParams.get("id")
    ? searchParams.get("id")
    : "6827c531cd393c9e354013c5";

  const getItemDetails = async () => {
    await fetch(`https://xuoapi.azurewebsites.net/api/v1/items/${itemId}`)
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
      {(buyPopup && tipoCompra == "buy") && <PopupConfirmation description={`Confirma que quer comprar o produto ${itemDetails.title}`} header={"Confirmação"} id={itemDetails._id} />}
      {(buyPopup && tipoCompra == "offer") && <PopupConfirmation description={`Deseja negociar o preço do ${itemDetails.title}`} header={"Negociar"} id={itemDetails._id} itemName={itemDetails.title} idseller={itemDetails.idseller} />}
      {itemDetails && (
        <div className="cmp-item-detail-page__item-detail">
          <div>
            <ImageCarrousel images={itemDetails.images} />
            <UserMiniProfileItem id={itemDetails.idseller} />
          </div>
          <div className="cmp-item-detail-page__item-detail--description">
            <h1>{itemDetails.title}</h1>
            <p
              style={{
                fontSize: "16px",
                color: `${itemDetails.condition == "used"
                    ? "orange"
                    : itemDetails.condition == "new"
                      ? "green"
                      : itemDetails.condition == "refurbished"
                        ? "lightgreen"
                        : itemDetails.condition == "broken"
                          ? "red"
                          : "black"
                  }`,
              }}
            >
              {itemDetails.condition}
            </p>
            <p>{itemDetails.description}</p>
            <div className="cmp-item-detail-page__item-detail--description--price-and-report">
              <b style={{ paddingRight: "10px" }}>{itemDetails.price}€</b>
              <ReportButton />
            </div>
            <div className="cmp-item-detail-page__item-detail--description--buttons">
              {itemDetails.idseller === sessionStorage.getItem("id") ? (
                <h2 style={{ textDecoration: "underline" }}>O TEU PRODUTO</h2>
              ) : (
                <>
                  <button
                    className="cmp-item-detail-page__item-detail--description--buttons--btn_primary"
                    onClick={() => {
                      setBuyPopup(true);
                      setTipoCompra("buy");
                    }}
                  >
                    Comprar
                  </button>
                  <button
                    className="cmp-item-detail-page__item-detail--description--buttons--btn_secondary"
                    onClick={() => {
                      setBuyPopup(true);
                      setTipoCompra("offer");
                    }}
                  >
                    Negociar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;
