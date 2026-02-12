import { useState } from "react";
import { WorksSection } from "../../Components/BeforeAfterSlider/WorksSection";
import { FeaturesSection } from "../../Components/FeaturesSection/FeaturesSection";
import { FAQ } from "../../Components/Question/FAQ";
import { ServiceCards } from "../../Components/ServiceCards/ServiceCards";
import "./HomePage.scss";

export const HomePage = () => {
  const [contactFile, setContactFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const full_name = (form.elements.namedItem("full_name") as HTMLInputElement)
      .value;
    const phone_number = (
      form.elements.namedItem("phone_number") as HTMLInputElement
    ).value;
    const addition = (form.elements.namedItem("addition") as HTMLInputElement)
      .value;

    const payload = {
      full_name,
      phone_number,
      addition: addition || "",
      photo: null, // зараз не відправляємо фото
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/callbacks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Помилка: ${res.status}`);

      alert("Заявку відправлено");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Помилка відправки");
    }
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero__content">
          <h1>Хімчистка MaxiClean</h1>

          <p>
            Професійна хімчистка за доступними цінами. Якість і чистота, яких ви
            гідні — дбайливо, швидко та з гарантією результату.
          </p>

          <form className="hero__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="full_name"
              placeholder="Ваше ім’я"
              required
            />

            <input
              type="tel"
              name="phone_number"
              placeholder="Номер телефону"
              required
            />

            <input
              type="text"
              name="addition"
              placeholder="Telegram / WhatsApp / Viber"
            />

            <button type="submit">
              <img src="/Phone-blue.png" alt="" />
              Передзвоніть мені
            </button>
          </form>

          <label className="hero__checkbox">
            <input type="checkbox" required />
            Даю згоду на обробку персональних даних
          </label>
        </div>

        <div className="hero__image">
          <img src="/HomePageLogo-1.png" alt="cleaning sofa" />
        </div>
      </section>

      {/* Features Section під синім блоком */}
      <FeaturesSection />

      <ServiceCards />
      <WorksSection />
      <section className="contact-form">
        <div className="contact-form__image">
          <img src="/HomePageLogo-3.png" alt="cleaning sofa" />
        </div>
        <div className="contact-form__content">
          <h2 className="contact-form__h2">Залишились питання?</h2>
          <p className="contact-form__description">
            Зв’яжемося з вами протягом 15 хвилин, щоб відповісти на всі
            запитання та розрахувати вартість.
          </p>

          <label className="contact-form__photo-upload">
            <img
              src="/ReviewModalImage.png"
              alt="image"
              className="contact-form__photo"
            />
            <p className="textUp__photo">Перетягніть зображення сюди</p>
            <p className="textDown__photo">або натисніть, щоб завантажити</p>
            <input
              type="photo"
              hidden
              onChange={(e) => setContactFile(e.target.files?.[0] || null)}
            />
          </label>
          {contactFile && (
            <p className="contact-form__file-name">{contactFile.name}</p>
          )}

          <form className="contact-form__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="full_name"
              placeholder="Ваше ім’я"
              required
            />

            <input
              type="tel"
              name="phone_number"
              placeholder="Номер телефону"
              required
            />

            <input
              type="text"
              name="addition"
              placeholder="Telegram / WhatsApp / Viber"
            />

            <button type="submit">
              <img src="/Phone-blue.png" alt="" />
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
