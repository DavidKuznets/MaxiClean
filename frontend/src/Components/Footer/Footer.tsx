import "./Footer.scss";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__left">
          <div className="footer__info">
            <p className="footer__city">м. Київ</p>
            <p className="footer__schedule">
              Графік роботи: Пн-Пт з 08:00 до 21:00
            </p>
          </div>
        </div>
        <div className="footer__logoSite">
          <img src="/instagram.png" alt="instagram" />
          <img src="/facebook.png" alt="facebook" />
        </div>
      </div>

      <div className="footer__container">
        <div className="footer__logo">
          <img src="/Logo.svg" alt="logo-MaxiClean" />
        </div>

        <nav className="footer__nav">
          <Link to="/" className="footer__link">
            Головна сторінка
          </Link>
          <Link to="/services" className="footer__link">
            Послуги
          </Link>
          <Link to="/about" className="footer__link">
            Про нас
          </Link>
          <Link to="/reviews" className="footer__link">
            Відгуки
          </Link>
          <Link to="/contacts" className="footer__link">
            Контакти
          </Link>
        </nav>

        <div className="footer__contact">
          <span className="footer__call-text">Дзвоніть зараз:</span>
          <a href="tel:0733883898" className="footer__phone">
            <img src="/life-number.svg" alt="phone" />
            (073) 388-38-98
          </a>
        </div>
      </div>
    </footer>
  );
};
