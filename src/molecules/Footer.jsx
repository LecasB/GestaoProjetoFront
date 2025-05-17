import "./Footer.scss";
import { FaPhoneAlt } from "react-icons/fa";

import { CgMail } from "react-icons/cg";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterLine } from "react-icons/ri";
import xuoLogo from '../../public/imgs/xuo.png';




const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
        <img src="/imgs/xuo.png" alt="Logo XUO" className="xuo_logo" />
        </div>
        <div className="footer-center">
          <ul>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Termos e Condições</a></li>
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Política de Cookies</a></li>
          </ul>
        </div>
        

        <div className="footer-right">
          <p> <CgMail className="Logos" />emaildaxuo@gmail.com</p>
          <p><FaPhoneAlt className="Logos" /> 918138567</p>
          <div className="social-icons">
            <a href="#"><FaSquareFacebook className="Logos" /></a>
            <a href="#"><FaInstagram className="Logos" /></a>
            <a href="#"><RiTwitterLine className="Logos" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;