import "./Header.scss";
import { NavLink } from "react-router-dom";


export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src="/Logo.svg" alt="logo-MaxiClean" />
        </div>

        <nav className="header__nav">
          <NavLink to="/" className="header__link">
            Головна сторінка
          </NavLink>
          <NavLink to="/services" className="header__link">
            Послуги
          </NavLink>
          <NavLink to="/about" className="header__link">
            Про нас
          </NavLink>
          <NavLink to="/reviews" className="header__link">
            Відгуки
          </NavLink>
          <NavLink to="/contacts" className="header__link">
            Контакти
          </NavLink>
        </nav>

        <div className="header__contact">
          <span className="header__call-text">Дзвоніть зараз:</span>
          <a href="tel:0733883898" className="header__phone">
            <img src="/life-number.svg" alt="phone" />
            (073) 388-38-98
          </a>
        </div>
      </div>
    </header>
  );
};
