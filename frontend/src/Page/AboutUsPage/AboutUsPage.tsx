import { WorksSection } from "../../Components/BeforeAfterSlider/WorksSection";
import { FeaturesSection } from "../../Components/FeaturesSection/FeaturesSection";
import { FAQ } from "../../Components/Question/FAQ";
import "./AboutUsPage.scss";

export const AboutUsPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/callbacks/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Помилка відправки форми");

      alert("Заявку відправлено");
      e.currentTarget.reset(); // очищаємо форму після відправки
    } catch (error) {
      console.error(error);
      alert("Помилка відправки");
    }
  };

  return (
    <div className="about-us-page">
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

            <input
              type="text"
              name="contact_info"
              placeholder="Telegram / WhatsApp / Viber"
            />

            <button type="submit">
              <img src="/Phone-blue.png" alt="phone-icon" />
              Передзвоніть мені
            </button>
          </form>

          <label className="about-us-hero__checkbox">
            <input type="checkbox" required />
            Даю згоду на обробку своїх персональних даних
          </label>
        </div>

        <div className="about-us-hero__image">
          <img src="/HomePageLogo-3.png" alt="cleaning sofa" />
        </div>
      </section>

      <FeaturesSection />
      <WorksSection />
      <FAQ />
    </div>
  );
};
