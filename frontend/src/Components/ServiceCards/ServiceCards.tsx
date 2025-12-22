import "./ServiceCards.scss";
import BlueArrow from "../../../public/blue-arrow.svg";
import { Link } from "react-router-dom";

export const ServiceCards = () => {
  return (
    <section className="services">
      <h2>Наші послуги</h2>
      <p>
        Ми надаємо комплекс професійних рішень, створених для того, щоб ваша
        оселя чи офіс завжди були чистими, затишними та безпечними.
      </p>
      <div className="services__grid">
        <div className="service-card">
          <img src="/MaxiClean-1.png" alt="М’які меблі" />
          <div className="service-card__info">
            <div>
              <h5>Хімчистка</h5>
              <h3>М’яких меблів</h3>
              <p>від 600₴</p>
            </div>
            <Link to={"/services/soft-furniture"} className="service-card__arrow">
              <img src={BlueArrow} alt="Детальніше" />
            </Link>
          </div>
        </div>
        <div className="service-card">
          <img src="/MaxiClean-2.png" alt="Килимові покриття" />
          <div className="service-card__info">
            <div>
              <h5>Хімчистка</h5>
              <h3>Килимові покриття</h3>
              <p>від 150₴ за 1 м²</p>
            </div>
            <Link to={"/services/carpets"} className="service-card__arrow">
              <img src={BlueArrow} alt="Детальніше" />
            </Link>
          </div>
        </div>
        <div className="service-card">
          <img src="/MaxiClean-3.png" alt="Матраци" />
          <div className="service-card__info">
            <div>
              <h5>Хімчистка</h5>
              <h3>Матраци</h3>
              <p>від 800₴</p>
            </div>
            <Link to={"/services/mattresses"} className="service-card__arrow">
              <img src={BlueArrow} alt="Детальніше" />
            </Link>
          </div>
        </div>
        <div className="service-card">
          <img src="/MaxiClean-4.png" alt="Салони авто" />
          <div className="service-card__info">
            <div>
              <h5>Хімчистка</h5>
              <h3>Салони авто</h3>
              <p>від 4500₴</p>
            </div>
            <Link to={"/services/car-interior"} className="service-card__arrow">
              <img src={BlueArrow} alt="Детальніше" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
