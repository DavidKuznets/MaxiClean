import { useState } from "react";
import { WorksSection } from "../../Components/BeforeAfterSlider/WorksSection";
import { FeaturesSection } from "../../Components/FeaturesSection/FeaturesSection";
import { FAQ } from "../../Components/Question/FAQ";
import { ServiceCards } from "../../Components/ServiceCards/ServiceCards";
import "./HomePage.scss";

// API URL configuration - змініть на потрібний сервер
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const CALLBACKS_ENDPOINT = `${API_BASE_URL}/api/v1/callbacks/`;

export const HomePage = () => {
  const [contactFile, setContactFile] = useState<File | null>(null);

  const submitCallback = async (form: HTMLFormElement, photo?: File | null) => {
    const full_name = (form.elements.namedItem("full_name") as HTMLInputElement)
      .value;
    const phone_number = (
      form.elements.namedItem("phone_number") as HTMLInputElement
    ).value;
    const addition = (form.elements.namedItem("addition") as HTMLInputElement)
      .value;

    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("phone_number", phone_number);
    formData.append("addition", addition || "");
    if (photo) formData.append("photo", photo);

    console.log("📤 Відправляємо на:", CALLBACKS_ENDPOINT);
    console.log("📋 Дані форми:", {
      full_name,
      phone_number,
      addition,
      hasPhoto: !!photo,
    });

    try {
      const res = await fetch(CALLBACKS_ENDPOINT, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      console.log("✅ Відповідь від сервера:", res.status, res.statusText);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          detail: "Невідома помилка від сервера",
        }));
        console.error("❌ Помилка сервера:", errorData);
        throw new Error(
          `Помилка ${res.status}: ${errorData.detail || JSON.stringify(errorData)}`,
        );
      }

      const responseData = await res.json();
      console.log("✅ Успішна відповідь:", responseData);
      return responseData;
    } catch (err) {
      if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
        console.error("❌ Помилка з'єднання:", err);
        throw new Error(
          `Помилка з'єднання з ${CALLBACKS_ENDPOINT}. Переконайтеся, що бекенд запущений.`,
        );
      }
      throw err;
    }
  };

  const handleHeroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      await submitCallback(form);
      alert("Заявку відправлено успішно!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert(
        `Помилка відправки: ${err instanceof Error ? err.message : "Невідома помилка"}`,
      );
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      await submitCallback(form, contactFile);
      alert("Заявку відправлено успішно!");
      form.reset();
      setContactFile(null);
    } catch (err) {
      console.error(err);
      alert(
        `Помилка відправки: ${err instanceof Error ? err.message : "Невідома помилка"}`,
      );
    }
  };

  return (
    <div className="home-page">
      {/* Верхня секція */}
      <section className="hero">
        <div className="hero__content">
          <h1>Хімчистка MaxiClean</h1>
          <p>
            Професійна хімчистка за доступними цінами. Якість і чистота, яких ви
            гідні — дбайливо, швидко та з гарантією результату.
          </p>

          <form className="hero__form" onSubmit={handleHeroSubmit}>
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

      <FeaturesSection />
      <ServiceCards />
      <WorksSection />

      {/* Нижня секція з фото */}
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
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setContactFile(e.target.files?.[0] || null)}
            />
          </label>
          {contactFile && (
            <p className="contact-form__file-name">{contactFile.name}</p>
          )}

          <form className="contact-form__form" onSubmit={handleContactSubmit}>
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
            <input type="checkbox" required /> Даю згоду на обробку своїх
            персональних даних
          </label>
        </div>
      </section>

      <FAQ />
    </div>
  );
};
