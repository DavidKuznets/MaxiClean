import { WorksSection } from "../../Components/BeforeAfterSlider/WorksSection";
import { FAQ } from "../../Components/Question/FAQ";
import { ServiceCards } from "../../Components/ServiceCards/ServiceCards";
import "./HomePage.scss";

export const HomePage = () => {
  return (
    <div className="home-page">
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
      <ServiceCards />
      <WorksSection />
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
