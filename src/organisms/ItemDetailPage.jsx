import ImageCarrousel from "../atoms/ImageCarrousel/ImageCarrousel";
import "./ItemDetailPage.scss";
import UserMiniProfileItem from "../atoms/UserMiniProfileItem/UserMiniProfileItem";
import ReportButton from "../atoms/ReportButton/ReportButton";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PopupTemplate from "../atoms/PopupTemplate/PopupTemplate";

const ItemDetailPage = () => {
  const [itemDetails, setItemDetails] = useState("");
  const [buyPopup, setBuyPopup] = useState(false);
  const [searchParams] = useSearchParams();
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

  const handleNegociar = async () => {
    const idsender = sessionStorage.getItem("id");
    const idreceiver = itemDetails.idseller;

    const payload = {
      idsender: idsender,
      idreceiver: idreceiver,
      date: new Date().toISOString(),
      message: `Ola, é possivel negociar o preço do artigo ${itemDetails.title}`,
    };

    try {
      await fetch("https://xuoapi.azurewebsites.net/api/v1/newMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  useEffect(() => {
    getItemDetails();
  }, []);
  return (
    <div className="cmp-item-detail-page">
      {buyPopup && (
        <PopupTemplate
          title={`Deseja comprar o produto: ${itemDetails.title} ?`}
        />
      )}
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
                color: `${
                  itemDetails.condition == "used"
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
                    onClick={() => setBuyPopup(true)}
                  >
                    Comprar
                  </button>
                  <button
                    className="cmp-item-detail-page__item-detail--description--buttons--btn_secondary"
                    onClick={handleNegociar}
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
