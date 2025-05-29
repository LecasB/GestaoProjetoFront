import { data } from 'react-router';
import './SocialCardAction.scss';
import Image from './ola.jpg'; 

const SocialCardAction = ({image, titulo, categorias}) => {
  return (
    <div className="socialaction-card">
      <img src={image} className="image" />
      <div className="text-overlay">
        <h2>{titulo}</h2>
        <p>{categorias.join(' • ')}</p>
      </div>
    </div>
  );
};

export default SocialCardAction;
