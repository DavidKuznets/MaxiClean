import { useState } from "react";
import phoneBlue from "../../../../public/Phone-blue.png";
import { WorksSection } from "../../../Components/BeforeAfterSlider/WorksSection";
import "../DefaultServicesStyle.scss";

export const MattressPage = () => {
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
        `Помилка відправки: ${
          err instanceof Error ? err.message : "Невідома помилка"
        }`,
      );
    }
  };

  return (
    <>
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
              name="consent"
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

      <section>
        <WorksSection />
      </section>

      <section className="ServicesSteps">
        <h2>6 етапів професійної хімчистки м'яких меблів</h2>
        <div className="ServicesSteps__list">
          <div className="step">
            <div className="step__header">
              <span>1</span>
              <p className="step__title">Огляд та аналіз</p>
            </div>
            <p className="step__desc">
              Наші спеціалісти оцінюють стан меблів, визначають тип тканини та
              рівень забруднення. Це дозволяє підібрати оптимальні засоби та
              методи очищення.
            </p>
          </div>

          <div className="step">
            <div className="step__header">
              <span>2</span>
              <p className="step__title">Попереднє сухе очищення</p>
            </div>
            <p className="step__desc">
              Видаляємо пил, крихти та сухі забруднення за допомогою
              професійного пилососа — готуємо меблі до глибшої обробки.
            </p>
          </div>

          <div className="step">
            <div className="step__header">
              <span>3</span>
              <p className="step__title">Обробка складних плям</p>
            </div>
            <p className="step__desc">
              Застосовуємо спеціалізовані засоби для делікатного та ефективного
              видалення плям від їжі, напоїв, жирних та інших забруднень.
            </p>
          </div>

          <div className="step">
            <div className="step__header">
              <span>4</span>
              <p className="step__title">Глибоке очищення</p>
            </div>
            <p className="step__desc">
              Потужним екстрактором виводимо глибокі забруднення, пилові кліщі,
              алергени та залишки плям із усіх шарів оббивки.
            </p>
          </div>

          <div className="step">
            <div className="step__header">
              <span>5</span>
              <p className="step__title">Нейтралізація запахів</p>
            </div>
            <p className="step__desc">
              Використовуємо спеціальні засоби, які усувають причини неприємних
              запахів, замість їх маскування. Ваші меблі пахнуть свіжістю.
            </p>
          </div>

          <div className="step">
            <div className="step__header">
              <span>6</span>
              <p className="step__title">Ополіскування та сушка</p>
            </div>
            <p className="step__desc">
              Ретельно видаляємо залишки засобів і зайву вологу, що скорочує час
              висихання і запобігає появі розводів або плісняви.
            </p>
          </div>
        </div>
      </section>

      <section className="ServicesPrices">
        <h2>Ціни на послуги</h2>
        <div className="ServicesPrices__grid">
          <div className="price-card">
            <img src="/Price&Services-1.png" alt="Маленький диван" />
            <p className="subtitle">Хімчистка</p>

            <p>Маленький диван</p>
            <span>
              <em>Від</em> 1000 ₴
            </span>
          </div>
          <div className="price-card">
            <img src="/Price&Services-2.png" alt="Малий диван" />
            <p className="subtitle">Хімчистка</p>

            <p>Малий диван</p>
            <span>
              <em>Від</em> 1200 ₴
            </span>
          </div>
          <div className="price-card">
            <img src="/Price&Services-3.png" alt="Великий диван" />
            <p className="subtitle">Хімчистка</p>

            <p>Великий диван</p>
            <span>
              <em>Від</em> 1600 ₴
            </span>
          </div>
          <div className="price-card">
            <img src="/Price&Services-4.png" alt="Кутовий диван малий" />
            <p className="subtitle">Хімчистка</p>

            <p>Кутовий диван малий</p>
            <span>
              <em>Від</em> 2000 ₴
            </span>
          </div>
          <div className="price-card">
            <img src="/Price&Services-5.png" alt="Кутовий диван великий" />
            <p className="subtitle">Хімчистка</p>

            <p>Кутовий диван великий</p>
            <span>
              <em>Від</em> 2500 ₴
            </span>
          </div>
          <div className="price-card">
            <img
              src="/Price&Services-6.png"
              alt="Кутовий диван з подовженням"
            />
            <p className="subtitle">Хімчистка</p>

            <p>Кутовий диван з подовженням</p>
            <span>
              <em>Від</em> 3000 ₴
            </span>
          </div>
          <div className="price-card">
            <img src="/Price&Services-7.png" alt="Шкіряний диван" />
            <p className="subtitle">Хімчистка</p>

            <p>Шкіряний диван</p>
            <span>
              <em>Від</em> 2000 ₴
            </span>
          </div>
          <div className="price-card">
            <img src="/Price&Services-8.png" alt="Крісло" />
            <p className="subtitle">Хімчистка</p>

            <p>Крісло</p>
            <span>
              <em>Від</em> 500 ₴
            </span>
          </div>
          <div className="price-card">
            <img src="/Price&Services-9.png" alt="Пуф" />
            <p className="subtitle">Хімчистка</p>

            <p>Пуф</p>
            <span>
              <em>Від</em> 150 ₴
            </span>
          </div>
          <div className="price-card">
            <img src="/Price&Services-10.png" alt="Стілець" />
            <p className="subtitle">Хімчистка</p>
            <p>Стілець</p>
            <span>
              <em>Від</em> 150 ₴
            </span>
          </div>
          <div className="price-card">
            <img src="/Price&Services-11.png" alt="Барний стілець" />
            <p className="subtitle">Хімчистка</p>
            <p>Барний стілець</p>
            <span>
              <em>Від</em> 200 ₴
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
