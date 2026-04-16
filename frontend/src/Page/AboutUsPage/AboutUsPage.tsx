import { WorksSection } from "../../Components/BeforeAfterSlider/WorksSection";
import { FeaturesSection } from "../../Components/FeaturesSection/FeaturesSection";
import { FAQ } from "../../Components/Question/FAQ";
import { ensureCsrfToken } from "../../utils/csrf";
import "./AboutUsPage.scss";

export const AboutUsPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const consent = (
      document.getElementById("consent-checkbox") as HTMLInputElement
    ).checked;

    if (!consent) {
      alert("Будь ласка, дайте згоду на обробку персональних даних.");
      return;
    }

    const formData = new FormData(form);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const csrfToken = await ensureCsrfToken(apiUrl);
      const res = await fetch(`${apiUrl}/api/v1/callbacks/`, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Помилка відправки форми");

      alert("Заявку відправлено!");
      form.reset();
      (
        document.getElementById("consent-checkbox") as HTMLInputElement
      ).checked = false;
    } catch (error) {
      console.error(error);
      alert("Помилка відправки форми");
    }
  };

  return (
    <div className="about-us-page">
      {/* Герой-секція */}
      <section className="about-us-hero">
        <div className="about-us-hero__content">
          <h1>Хімчистка MaxiClean</h1>
          <p>
            Професійна хімчистка за доступними цінами. Якість і чистота, яких ви
            гідні — дбайливо, швидко та з гарантією результату.
          </p>

          <form className="about-us-hero__form" onSubmit={handleSubmit}>
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

            <button type="submit" className="submit-button">
              <img src="/Phone-blue.png" alt="phone-icon" />
              Передзвоніть мені
            </button>
          </form>

          {/* Чекбокс під формою */}
          <label className="about-us-hero__checkbox" htmlFor="consent-checkbox">
            <input type="checkbox" id="consent-checkbox" />
            Даю згоду на обробку своїх персональних даних
          </label>
        </div>

        <div className="about-us-hero__image">
          <img src="/HomePageLogo-3.png" alt="cleaning sofa" />
        </div>
      </section>

      {/* Секція з текстом про компанію */}
      <section className="about-us-text">
        <h2>Про компанію MaxiClean</h2>
        <p>
          Скориставшись нашими послугами хімчистки, ви можете бути впевнені у
          бездоганній якості та оперативності виконання робіт.
        </p>
        <p>
          Запорука відмінного результату — це команда професіоналів, які
          досконало знають свою справу. Кожен наш співробітник має глибокі
          знання у сфері хімчистки, працює на результат і завжди залишається
          ввічливим, уважним та доброзичливим до клієнта.
        </p>
        <p>
          Ми ретельно підбираємо фахівців, яким довіряємо виконання робіт. Саме
          тому гарантуємо не лише якісний результат, а й високий рівень сервісу.
          Для нас важливо, щоб майстер, який працює у вас вдома, поєднував
          професіоналізм із культурою спілкування та повагою до клієнта.
        </p>
        <p>
          Обираючи MaxiClean, ви отримуєте не просто послугу хімчистки, а
          комплексний сервіс, де важлива кожна деталь. Ви можете бути впевнені у
          чистоті вашого дому, автомобіля чи меблів, а також у приємному досвіді
          співпраці з нашою командою.
        </p>
        <p>
          У результаті ви насолоджуєтеся ідеальною чистотою та залишаєтеся
          повністю задоволені якістю обслуговування.
        </p>
      </section>

      <FeaturesSection />
      <WorksSection />
      <FAQ />
    </div>
  );
};
