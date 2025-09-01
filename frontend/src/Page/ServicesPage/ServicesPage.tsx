import { FAQ } from "../../Components/Question/FAQ";
import "./ServicesPage.scss";

export const ServicesPage = () => {
  return (
    <div className="services-page">
      <section className="services">
        <div className="services__header">
          <h2>Наші послуги</h2>
          <p className="services__subtitle">
            Ми надаємо комплекс професійних рішень, створених для того, щоб ваша
            оселя чи офіс завжди були чистими, затишними та безпечними.
          </p>
        </div>

        <div className="services__grid">
          <div className="service-card">
            <img src="/MaxiClean-1.png" alt="М’які меблі" />
            <h3>М’яких меблів</h3>
            <p>від 600₴</p>
          </div>
          <div className="service-card">
            <img src="/MaxiClean-2.png" alt="Килимові покриття" />
            <h3>Килимові покриття</h3>
            <p>від 150₴ за 1 м²</p>
          </div>
          <div className="service-card">
            <img src="/MaxiClean-3.png" alt="Матраци" />
            <h3>Матраци</h3>
            <p>від 800₴</p>
          </div>
          <div className="service-card">
            <img src="/MaxiClean-4.png" alt="Салони авто" />
            <h3>Салони авто</h3>
            <p>від 4500₴</p>
          </div>
        </div>
      </section>
      <FAQ />
    </div>
  );
};
