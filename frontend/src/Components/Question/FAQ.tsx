// Components/FAQ/FAQ.jsx
import { useState } from "react";
import "./FAQ.scss";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = [
    {
      q: "Чи потрібно бути вдома під час прибирання?",
      a: "Ні, ваша присутність необов’язкова. Ви можете передати доступ до приміщення заздалегідь або бути присутнім лише на початку та в кінці робіт. Ми гарантуємо безпечне та дбайливе ставлення до вашого майна.",
    },
    {
      q: "Як часто рекомендуєте замовляти клінінг?",
      a: "Рекомендуємо генеральне прибирання раз на місяць, підтримувальне — щотижня.",
    },
    {
      q: "Що робити з тваринами в квартирі, коли прийдуть клінери?",
      a: "Бажано на час прибирання обмежити пересування тварин, щоб не створювати для них стресу.",
    },
    {
      q: "Які гарантії на якість клінінгу?",
      a: "Ми працюємо за договором і гарантуємо якість виконання послуг.",
    },
    {
      q: "Чи включено у вартість прибирання миття вікон?",
      a: "Миття вікон можна замовити додатково до основного пакету послуг.",
    },
    {
      q: "Чи використовуєте пароочисники і підлогомийні машини під час клінінгу?",
      a: "Так, ми застосовуємо професійне обладнання для максимально ефективного результату.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="faq__container">
        {/* Ліва частина */}
        <div className="faq__left">
          <h2>Питання</h2>
          <p>
            Тут ви знайдете відповіді на найпопулярніші запитання про наші
            послуги, умови та процес роботи.
          </p>
        </div>

        {/* Права частина */}
        <div className="faq__right">
          {questions.map((item, index) => (
            <div
              key={index}
              className={`faq__item ${
                openIndex === index ? "faq__item--open" : ""
              }`}
            >
              <div
                className="faq__question"
                onClick={() => toggleQuestion(index)}
              >
                <span>{item.q}</span>
                <button>{openIndex === index ? "−" : "+"}</button>
              </div>
              {openIndex === index && <p className="faq__answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
