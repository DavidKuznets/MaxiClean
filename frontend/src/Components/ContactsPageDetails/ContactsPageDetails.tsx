import './ContactsPageDetails.scss'
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

export const ContactsPageDetails = () => {
  return (
    <div className="contacts">
      <div className="contacts__container">

        <div className="contacts__item">
          <span className="contacts__icon">
            <FaPhoneAlt />
          </span>
          <div>
            <div className="contacts__label">Телефон</div>
            <div className="contacts__value"><b>(073) 388-38-98</b></div>
          </div>
        </div>

        <div className="contacts__item">
          <span className="contacts__icon">
            <FaMapMarkerAlt />
          </span>
          <div>
            <div className="contacts__label">Адреса</div>
            <div className="contacts__value"><b>м. Київ та Київська область</b></div>
          </div>
        </div>

        <div className="contacts__item">
          <span className="contacts__icon">
            <FaClock />
          </span>
          <div>
            <div className="contacts__label">Графік роботи</div>
            <div className="contacts__value"><b>Пн–Пт з 09:00 до 20:00</b></div>
          </div>
        </div>

        <div className="contacts__socials">
          <a href="#" className="contacts__social">
            <FaFacebookF />
          </a>
          <a href="#" className="contacts__social">
            <FaInstagram />
          </a>
        </div>

      </div>
    </div>
  )
};