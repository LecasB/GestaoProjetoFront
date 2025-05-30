import './SocialCardAction.scss';

const SocialCardAction = ({ image, titulo, categorias }) => {
  return (
    <div className="socialaction-card">
      <img src={image} alt={titulo} className="image" />
      <div className="text-overlay">
        <h2>{titulo}</h2>
        <p>{categorias.join(' • ')}</p>
      </div>
    </div>
  );
};

export default SocialCardAction;
