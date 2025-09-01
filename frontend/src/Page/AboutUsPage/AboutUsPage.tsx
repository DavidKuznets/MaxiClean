import { FAQ } from "../../Components/Question/FAQ";
import "./AboutUsPage.scss";

export const AboutUsPage = () => {
  return (
    <>
      <section className="hero-about">
        <div className="hero-about__content">
          <h1>Хімчистка MaxiClean</h1>
          <p>
            Професійна хімчистка за доступними цінами. Якість і чистота, яких ви
            гідні — дбайливо, швидко та з гарантією результату.
          </p>

          <form className="hero-about__form">
            <input type="text" placeholder="Ваше ім’я" />
            <input type="tel" placeholder="Номер телефону" />
            <button type="submit">
              <img src="Phone-blue.png" alt="phone-icon" /> Передзвоніть мені
            </button>
          </form>

          <label className="hero-about__checkbox">
            <input type="checkbox" /> Даю згоду на обробку своїх персональних
            даних
          </label>
        </div>

        <div className="hero-about__image">
          <img src="/AboutUsPage.png" alt="cleaning sofa" />
        </div>
      </section>

      <section className="DryCleaners">
        <div className="DryCleaners__header">
          <h2>Хімчистка м'яких меблів — це</h2>
        </div>
        <div className="DryCleaners__section">
          <div className="DryCleaners__item">
            <img src="/deepCleaning.png" alt="deep-cleaning" />
            <div className="DryCleaners__item__text">
              <p className="title">Глибоке очищення меблів</p>
              <p>
                Видалення пилу, плям та неприємних запахів з тканини та оббивки.
              </p>
            </div>
          </div>
          <div className="DryCleaners__item">
            <img src="/chemistry.png" alt="chemistry" />
            <div className="DryCleaners__item__text">
              <p className="title">Використання безпечних засобів</p>
              <p>
                Сертифіковані екологічні матеріали, безпечні для дітей і тварин.
              </p>
            </div>
          </div>
          <div className="DryCleaners__item">
            <img src="/equipment.png" alt="equipment" />
            <div className="DryCleaners__item__text">
              <p className="title">Сучасне обладнання</p>
              <p>Професійні апарати для глибокого і ефективного очищення.</p>
            </div>
          </div>
        </div>
      </section>
      <FAQ />

    </>
  );
};
