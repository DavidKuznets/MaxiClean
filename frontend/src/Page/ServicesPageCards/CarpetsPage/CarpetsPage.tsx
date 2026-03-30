import { useState } from "react";
import phoneBlue from "../../../../public/Phone-blue.png";
import "../DefaultServicesStyle.scss";
import { WorksCategory } from "../WorksCategory";

export const CarpetsPage: React.FC = () => {
  const [consentChecked, setConsentChecked] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const CALLBACKS_ENDPOINT = `${API_BASE_URL}/api/v1/callbacks/`;

  const submitCallback = async (form: HTMLFormElement) => {
    const full_name = (form.elements.namedItem("full_name") as HTMLInputElement)
      .value;
    const phone_number = (
      form.elements.namedItem("phone_number") as HTMLInputElement
    ).value;

    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("phone_number", phone_number);

    const res = await fetch(CALLBACKS_ENDPOINT, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ detail: "Невідома помилка" }));
      throw new Error(`Помилка ${res.status}: ${errorData.detail}`);
    }

    return res.json();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consentChecked) {
      alert("Будь ласка, дайте згоду на обробку персональних даних.");
      return;
    }

    const form = e.currentTarget;

    try {
      await submitCallback(form);
      alert("Заявку відправлено успішно!");
      form.reset();
      setConsentChecked(false);
    } catch (err) {
      console.error(err);
      alert(
        `Помилка відправки: ${err instanceof Error ? err.message : "Невідома помилка"}`,
      );
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="hero-services">
        <div className="hero-services__content">
          <h1>Хімчистка MaxiClean</h1>
          <p>
            Професійна хімчистка за доступними цінами. Якість і чистота, яких ви
            гідні — дбайливо, швидко та з гарантією результату.
          </p>

          <form className="hero-services__form" onSubmit={handleSubmit}>
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
            <button type="submit">
              <img src={phoneBlue} alt="phone-icon" /> Передзвоніть мені
            </button>
          </form>

          <label className="hero-services__checkbox">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
            />
            Даю згоду на обробку своїх персональних даних
          </label>
        </div>

        <div className="hero-services__image">
          <img src="/AboutUsPage.png" alt="cleaning sofa" />
        </div>
      </section>

      {/* Переваги */}
      <section className="ServicesDryCleaners">
        <div className="ServicesDryCleaners__header">
          <h2>Хімчистка м'яких меблів — це</h2>
        </div>
        <div className="ServicesDryCleaners__section">
          <div className="ServicesDryCleaners__item">
            <img src="/deepCleaning.png" alt="deep-cleaning" />
            <div className="ServicesDryCleaners__item__text">
              <p className="title">Глибоке очищення меблів</p>
              <p>
                Видалення пилу, плям та неприємних запахів з тканини та оббивки.
              </p>
            </div>
          </div>
          <div className="ServicesDryCleaners__item">
            <img src="/chemistry.png" alt="chemistry" />
            <div className="ServicesDryCleaners__item__text">
              <p className="title">Використання безпечних засобів</p>
              <p>
                Сертифіковані екологічні матеріали, безпечні для дітей і тварин.
              </p>
            </div>
          </div>
          <div className="ServicesDryCleaners__item">
            <img src="/equipment.png" alt="equipment" />
            <div className="ServicesDryCleaners__item__text">
              <p className="title">Сучасне обладнання</p>
              <p>Професійні апарати для глибокого і ефективного очищення.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Коли потрібно чистити */}
      <section className="ServicesDryCleaners">
        <div className="ServicesDryCleaners__header">
          <h2>Коли потрібно проводити хімчистку?</h2>
        </div>
        <div className="ServicesDryCleaners__section">
          <div className="ServicesDryCleaners__item">
            <img src="/AfterStains.png" alt="deep-cleaning" />
            <div className="ServicesDryCleaners__item__text">
              <p className="title">Після появи плям</p>
              <p>
                Плями від їжі, напоїв, домашніх тварин потрібно видаляти швидко.
              </p>
            </div>
          </div>
          <div className="ServicesDryCleaners__item">
            <img src="/regularCheck-Up.png" alt="chemistry" />
            <div className="ServicesDryCleaners__item__text">
              <p className="title">Регулярна профілактика</p>
              <p>
                Рекомендовано проводити 1-2 рази на рік для підтримки чистоти.
              </p>
            </div>
          </div>
          <div className="ServicesDryCleaners__item">
            <img src="/allergy.png" alt="equipment" />
            <div className="ServicesDryCleaners__item__text">
              <p className="title">При алергіях та пилових кліщах</p>
              <p>Для зниження алергенів та покращення здоров'я мешканців.</p>
            </div>
          </div>
        </div>
      </section>
       <WorksCategory category="Килими" />
    </>
  );
};
