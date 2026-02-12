import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <NavLink to="/" className="header__logo" onClick={closeMenu}>
          <img src="/Logo.svg" alt="logo-MaxiClean" />
        </NavLink>

        {/* Desktop nav */}
        <nav className="header__nav-desktop">
          <NavLink to="/" className="header__link">
            Головна
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

        {/* Phone */}
        <div className="header__contact">
          <a href="tel:0733883898" className="header__phone">
            <img src="/life-number.svg" alt="phone" />
            (073) 388-38-98
          </a>
        </div>
        {/* Burger */}
        <button
          className={`header__burger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Fullscreen mobile menu */}
      {isMenuOpen && (
        <aside className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <div
            className="mobile-menu__card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mobile-menu__header">
              <div className="mobile-menu__logo">
                <img src="/Logo.svg" alt="MaxiClean" />
              </div>
            </div>

            {/* Navigation */}
            <nav className="mobile-menu__nav">
              <NavLink to="/" onClick={closeMenu}>
                Головна сторінка
              </NavLink>
              <NavLink to="/services" onClick={closeMenu}>
                Послуги
              </NavLink>
              <NavLink to="/about" onClick={closeMenu}>
                Про нас
              </NavLink>
              <NavLink to="/reviews" onClick={closeMenu}>
                Відгуки
              </NavLink>
              <NavLink to="/contacts" onClick={closeMenu}>
                Контакти
              </NavLink>
            </nav>

            {/* Phone */}
            <div className="mobile-menu__footer">
              <a href="tel:0733883898">
                <img src="/life-number.svg" alt="phone" />
                (073) 388-38-98
              </a>
            </div>
          </div>
        </aside>
      )}
    </header>
  );
};
