import "./LeilaoCard.scss";

const LeilaoCard = ({ descricao, imagem, preco, dataInicio, dataFim }) => {
  const formatDateForInput = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isAuctionEnded = () => {
    const end = new Date(dataFim).getTime();
    const now = Date.now();
    return end - now <= 0;
  };

  return (
    <div className="leilao-card">
      <div className="leilao-card__image-container">
        <img
          src={imagem}
          alt="Imagem do leilão"
          className="leilao-card__image"
        />
      </div>
      <div className="leilao-card__info">
        <h3 className="leilao-card__descricao">{descricao}</h3>
        <p className="leilao-card__price">{preco}€</p>
        <div className="leilao-card__dates">
          <label>
            Início:
            <input
              type="date"
              value={formatDateForInput(dataInicio)}
              readOnly
              className="leilao-card__input"
            />
          </label>
          <label>
            Fim:
            <input
              type="date"
              value={formatDateForInput(dataFim)}
              readOnly
              className="leilao-card__input"
            />
          </label>
        </div>

        {isAuctionEnded() && (
          <div className="leilao-card__ended">Leilão terminado</div>
        )}
      </div>
    </div>
  );
};

export default LeilaoCard;
