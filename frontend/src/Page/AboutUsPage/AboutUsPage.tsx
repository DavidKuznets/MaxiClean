import { WorksSection } from "../../Components/BeforeAfterSlider/WorksSection";
import { FeaturesSection } from "../../Components/FeaturesSection/FeaturesSection";
import { FAQ } from "../../Components/Question/FAQ";
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
      const res = await fetch("http://127.0.0.1:8000/api/v1/callbacks/", {
        method: "POST",
        body: formData,
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
          MaxiClean — це сучасна клінінгова компанія, створена з метою
          забезпечити бездоганну чистоту та комфорт у домівках, офісах і
          комерційних приміщеннях. Компанія була заснована командою
          професіоналів, які прагнули поєднати високі стандарти сервісу,
          надійність та доступну ціну для кожного клієнта.
        </p>
        <p>
          З моменту заснування MaxiClean активно розвивається, впроваджує
          сучасні технології прибирання, використовує безпечні та ефективні
          засоби, а також постійно вдосконалює якість обслуговування. Наша
          команда складається з досвідчених фахівців, які відповідально
          ставляться до своєї роботи та приділяють увагу кожній деталі.
        </p>
        <p>
          Ми пропонуємо широкий спектр послуг: генеральне та підтримуюче
          прибирання, миття вікон, хімчистку м’яких меблів, післяремонтне
          прибирання та обслуговування комерційних приміщень. Головна мета
          компанії — створити для клієнтів чистий, безпечний і затишний простір
          без зайвих турбот.
        </p>
        <p>
          MaxiClean цінує довіру своїх клієнтів, тому гарантує якість виконаних
          робіт, пунктуальність і індивідуальний підхід до кожного замовлення.
          Ми працюємо для того, щоб чистота стала простою та доступною щодня.
        </p>
      </section>

      <FeaturesSection />
      <WorksSection />
      <FAQ />
    </div>
  );
};
