import './SocialCardAction.scss';
import Image from './ola.jpg'; 

const SocialCardAction = () => {
  return (
    <div className="socailaction-card">
      <img src={Image} className="image" />
      <div className="text-overlay">
        <h2>Canil da Tocha</h2>
        <p>Mantas, Camisolas, Comida, Brinquedos</p>
      </div>
    </div>
  );
};

export default SocialCardAction;
