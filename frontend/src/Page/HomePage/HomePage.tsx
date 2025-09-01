import { FAQ } from "../../Components/Question/FAQ";
import "./HomePage.scss";

export const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <h1>Хімчистка MaxiClean</h1>
          <p>
            Професійна хімчистка за доступними цінами. Якість і чистота, яких ви
            гідні — дбайливо, швидко та з гарантією результату.
          </p>

          <form className="hero__form">
            <input type="text" placeholder="Ваше ім’я" />
            <input type="tel" placeholder="Номер телефону" />
            <button type="submit">
              <img src="Phone-blue.png" alt="phone-icon" /> Передзвоніть мені
            </button>
          </form>

          <label className="hero__checkbox">
            <input type="checkbox" /> Даю згоду на обробку своїх персональних
            даних
          </label>
        </div>

        <div className="hero__image">
          <img src="/HomePageLogo-1.png" alt="cleaning sofa" />
        </div>
      </section>

      {/* Features Section під синім блоком */}
      <section className="features">
        <div className="features__grid">
          <div className="feature-card">
            <img src="/equipment.png" alt="Сучасне обладнання" />
            <p>Сучасне обладнання</p>
          </div>
          <div className="feature-card">
            <img src="/chemistry.png" alt="Професійні засоби" />
            <p>Професійні засоби</p>
          </div>
          <div className="feature-card">
            <img src="/care.png" alt="Турбота до ваших меблів" />
            <p>Турбота до ваших меблів</p>
          </div>
          <div className="feature-card">
            <img src="/convenientTime.png" alt="В зручний для вас час" />
            <p>В зручний для вас час</p>
          </div>
        </div>
        <div className="features__image">
          <img src="/HomePageLogo-2.png" alt="cleaning sofa" />
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Наші послуги</h2>
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
      <section className="contact-form">
        <div className="contact-form__image">
          <img src="/HomePageLogo-3.png" alt="cleaning sofa" />
        </div>

        <div className="contact-form__content">
          <h2>Залишились питання?</h2>
          <p>
            Зв’яжемося з вами протягом 15 хвилин, щоб відповісти на всі
            запитання та розрахувати вартість.
          </p>
          <form className="contact-form__form">
            <input type="text" placeholder="Ваше ім’я" />
            <input type="tel" placeholder="Номер телефону" />
            <button type="submit">
              <img src="/Phone-blue.png" alt="phone" />
              Передзвоніть мені
            </button>
          </form>

          <label className="contact-form__checkbox">
            <input type="checkbox" /> Даю згоду на обробку своїх персональних
            даних
          </label>
        </div>
      </section>
      <FAQ />
    </div>
  );
};
