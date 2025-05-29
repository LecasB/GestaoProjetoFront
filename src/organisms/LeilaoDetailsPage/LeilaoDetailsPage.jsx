import ImageCarrousel from "../../atoms/ImageCarrousel/ImageCarrousel";
import "./LeilaoDetailsPage.scss";
import UserMiniProfileItem from "../../atoms/UserMiniProfileItem/UserMiniProfileItem";
import ReportButton from "../../atoms/ReportButton/ReportButton";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const LeilaoDetailsPage = () => {
  const [itemDetails, setItemDetails] = useState("");
  const [searchParams] = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [highestBid, setHighestBid] = useState(0);
  const [lastBidder, setLastBidder] = useState("Desconhecido");

  const itemId = searchParams.get("id")
    ? searchParams.get("id")
    : "6827c531cd393c9e354013c5";

  const getItemDetails = async () => {
    await fetch(`https://xuoapi.azurewebsites.net/api/v1/items/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        setItemDetails(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do item:", error);
      });
  };

  const getAuctionDetails = async () => {
    try {
      const response = await fetch(
        `https://xuoapi.azurewebsites.net/api/v1/leilao/${itemId}`
      );
      const data = await response.json();

      setHighestBid(data.preco);
      setLastBidder(data.nomeUser || data.idUser || "Desconhecido");
    } catch (error) {
      console.error("Erro ao buscar dados do leilão:", error);
    }
  };

  const handleBid = async () => {
    const numericBid = parseFloat(bidAmount);

    if (isNaN(numericBid)) {
      alert("Por favor, introduz um valor válido.");
      return;
    }

    if (numericBid <= highestBid) {
      alert(`A oferta deve ser superior a ${highestBid}€.`);
      return;
    }

    try {
      const userId = sessionStorage.getItem("id");

      if (!userId) {
        alert("Utilizador não autenticado.");
        return;
      }

      const response = await fetch(
        `https://xuoapi.azurewebsites.net/api/v1/leilao/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idUser: userId,
            preco: numericBid,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar o leilão.");
      }

      await getAuctionDetails();
      setShowPopup(false);
      setBidAmount("");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao fazer a licitação.");
    }
  };

  useEffect(() => {
    getItemDetails();
    getAuctionDetails();
  }, []);

  return (
    <div className="cmp-leilao-page">
      {itemDetails && (
        <div className="cmp-leilao-page__item-detail">
          <div>
            <ImageCarrousel images={itemDetails.images} />
            <UserMiniProfileItem id={itemDetails.idseller} />
          </div>
          <div className="cmp-leilao-page__item-detail--description">
            <h1>{itemDetails.title}</h1>
            <p>{itemDetails.description}</p>
            <div className="cmp-leilao-page__item-detail--description--price-and-report">
              <b>Oferta mais alta: {highestBid}€</b>
              <span>Última oferta feita por: {lastBidder}</span>
              <ReportButton />
            </div>
            <div className="cmp-leilao-page__item-detail--description--buttons">
              <button
                className="cmp-leilao-page__item-detail--description--buttons--btn_primary"
                onClick={() => setShowPopup(true)}
              >
                Licitar
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Introduz o valor da licitação</h3>
            <input
              type="number"
              min={highestBid + 1}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Ex: 40"
            />
            <div className="popup-buttons">
              <button onClick={handleBid}>Licitar</button>
              <button onClick={() => setShowPopup(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeilaoDetailsPage;
