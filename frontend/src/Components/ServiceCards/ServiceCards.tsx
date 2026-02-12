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
          <img src="/MaxiClean-1.png" alt="М’які меблі" className="service-card__image" />
          <div className="service-card__info">
            <div>
              <h5>Хімчистка</h5>
              <h3>Диванів</h3>
              <p>від 1800₴</p>
            </div>
            <Link to={"/services/sofa"} className="service-card__arrow">
              <img src={BlueArrow} alt="Детальніше" />
            </Link> 
          </div>
        </div>
        <div className="service-card">
          <img src="/MaxiClean-2.png" alt="Килимові покриття" className="service-card__image" />
          <div className="service-card__info">
            <div>
              <h5>Хімчистка</h5>
              <h3>Килимові покриття</h3>
              <p>від 200₴ за 1 м²</p>
            </div>
            <Link to={"/services/carpets"} className="service-card__arrow">
              <img src={BlueArrow} alt="Детальніше" />
            </Link>
          </div>
        </div>
        <div className="service-card">
          <img src="/MaxiClean-3.png" alt="Матраци" className="service-card__image" />
          <div className="service-card__info">
            <div>
              <h5>Хімчистка</h5>
              <h3>Матраци</h3>
              <p>від 900₴</p>
            </div>
            <Link to={"/services/mattresses"} className="service-card__arrow">
              <img src={BlueArrow} alt="Детальніше" />
            </Link>
          </div>
        </div>
        <div className="service-card">
          <img src="/Chair.webp" alt="Стільці" className="service-card__image" />
          <div className="service-card__info">
            <div>
              <h5>Хімчистка</h5>
              <h3>Стільці</h3>
              <p>від 350₴</p>
            </div>
            <Link to={"/services/chair"} className="service-card__arrow">
              <img src={BlueArrow} alt="Детальніше" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
