import { useState } from "react";
import { WorksSection } from "../../Components/BeforeAfterSlider/WorksSection";
import { FeaturesSection } from "../../Components/FeaturesSection/FeaturesSection";
import { FAQ } from "../../Components/Question/FAQ";
import { ServiceCards } from "../../Components/ServiceCards/ServiceCards";
import { ensureCsrfToken } from "../../utils/csrf";
import "./HomePage.scss";

// API URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const CALLBACKS_ENDPOINT = `${API_BASE_URL}/api/v1/callbacks/`;

export const HomePage = () => {
  const [heroConsent, setHeroConsent] = useState(false);
  const [contactFile, setContactFile] = useState<File | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);

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

    try {
      const csrfToken = await ensureCsrfToken(API_BASE_URL);
      const res = await fetch(CALLBACKS_ENDPOINT, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ detail: "Невідома помилка від сервера" }));
        throw new Error(
          `Помилка ${res.status}: ${errorData.detail || JSON.stringify(errorData)}`,
        );
      }

      const responseData = await res.json();
      return responseData;
    } catch (err) {
      if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
        throw new Error(
          `Помилка з'єднання з ${CALLBACKS_ENDPOINT}. Переконайтеся, що бекенд запущений.`,
        );
      }
      throw err;
    }
  };

  const handleHeroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!heroConsent) {
      alert("Будь ласка, дайте згоду на обробку персональних даних.");
      return;
    }
    const form = e.currentTarget;
    try {
      await submitCallback(form);
      alert("Заявку відправлено успішно!");
      form.reset();
      setHeroConsent(false);
    } catch (err) {
      alert(
        `Помилка відправки: ${err instanceof Error ? err.message : "Невідома помилка"}`,
      );
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consentChecked) {
      alert("Будь ласка, дайте згоду на обробку персональних даних.");
      return;
    }

    const form = e.currentTarget;
    try {
      await submitCallback(form, contactFile);
      alert("Заявку відправлено успішно!");
      form.reset();
      setContactFile(null);
      setConsentChecked(false);
    } catch (err) {
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
            <input
              type="checkbox"
              checked={heroConsent}
              onChange={(e) => setHeroConsent(e.target.checked)}
            />
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
          <label className="contact-form__photo-upload">
            {contactFile ? (
              <div className="contact-form__preview">
                <img src={URL.createObjectURL(contactFile)} alt="preview" />
                <div className="contact-form__overlay">Змінити фото</div>
              </div>
            ) : (
              <div className="contact-form__upload-placeholder">
                <img src="/ReviewModalImage.png" alt="" />
                <p className="textUp__photo">Додати фото</p>
                <p className="textDown__photo">PNG, JPG до 10MB</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setContactFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>
      </section>

      <FAQ />
    </div>
  );
};
