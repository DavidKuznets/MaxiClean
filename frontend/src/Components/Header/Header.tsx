import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">
          <img src="/Logo.svg" alt="logo-MaxiClean" />
        </div>

        {/* Burger */}
        <button
          className={`header__burger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav */}
        <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
          <NavLink to="/" className="header__link" onClick={toggleMenu}>
            Головна сторінка
          </NavLink>
          <NavLink to="/services" className="header__link" onClick={toggleMenu}>
            Послуги
          </NavLink>
          <NavLink to="/about" className="header__link" onClick={toggleMenu}>
            Про нас
          </NavLink>
          <NavLink to="/reviews" className="header__link" onClick={toggleMenu}>
            Відгуки
          </NavLink>
          <NavLink to="/contacts" className="header__link" onClick={toggleMenu}>
            Контакти
          </NavLink>
        </nav>

        {/* Phone */}
        <div className="header__contact">
          <a href="tel:0733883898" className="header__phone">
            <img src="/life-number.svg" alt="phone" />
            (073) 388-38-98
          </a>
        </div>
      </div>
    </header>
  );
};
