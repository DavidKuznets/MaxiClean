import { WorksSection } from "../../Components/BeforeAfterSlider/WorksSection";
import { FAQ } from "../../Components/Question/FAQ";
import "./AboutUsPage.scss";

export const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <section className="about-us-hero">
        <div className="about-us-hero__content">
          <h1>Хімчистка MaxiClean</h1>
          <p>
            Професійна хімчистка за доступними цінами. Якість і чистота, яких ви
            гідні — дбайливо, швидко та з гарантією результату.
          </p>

          <form className="about-us-hero__form">
            <input type="text" placeholder="Ваше ім’я" />
            <input type="tel" placeholder="Номер телефону" />
            <button type="submit">
              <img src="Phone-blue.png" alt="phone-icon" /> Передзвоніть мені
            </button>
          </form>

          <label className="about-us-hero__checkbox">
            <input type="checkbox" /> Даю згоду на обробку своїх персональних
            даних
          </label>
        </div>

        <div className="about-us-hero__image">
          <img src="/HomePageLogo-3.png" alt="cleaning sofa" />
        </div>
      </section>

      <section className="about-us-features">
        <div className="about-us-features__grid">
          <div className="about-us-feature-card">
            <img src="/equipment.png" alt="Сучасне обладнання" />
            <p>Сучасне обладнання</p>
          </div>
          <div className="about-us-feature-card">
            <img src="/chemistry.png" alt="Професійні засоби" />
            <p>Професійні засоби</p>
          </div>
          <div className="about-us-feature-card">
            <img src="/care.png" alt="Турбота до ваших меблів" />
            <p>Турбота до ваших меблів</p>
          </div>
          <div className="about-us-feature-card">
            <img src="/convenientTime.png" alt="В зручний для вас час" />
            <p>В зручний для вас час</p>
          </div>
        </div>
        <div className="about-us-features__image">
          <img src="/HomePageLogo-2.png" alt="cleaning sofa" />
        </div>
      </section>

      <WorksSection />
      <FAQ />
    </div>
  );
};
