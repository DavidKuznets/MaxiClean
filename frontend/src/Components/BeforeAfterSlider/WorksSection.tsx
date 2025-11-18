// WorksSection.tsx
import React, { useState } from "react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import "./WorksSection.scss";

const works = {
  Матраци: {
    before: "/before-1.jpg",
    after: "/after-1.jpg",
  },
  "Килимові покриття": {
    before: "/before-6.png",
    after: "/after-6.png",
  },
  "Дивани": {
    before: "/before-2.png",
    after: "/after-2.png",
  },
  Стільці: {
    before: "/before-3.png",
    after: "/after-3.png",
  },
};

export const WorksSection: React.FC = () => {
  const [active, setActive] = useState<keyof typeof works>("Матраци");

  return (
    <section className="works">
      <div className="works__content">
        <h2 className="works__title">Наші роботи</h2>
        <p className="works__text">
          Дивіться реальні результати нашої роботи у форматі «До / Після». Ми
          відновлюємо чистоту та свіжість меблів, повертаючи їм первісний вигляд
          і комфорт.
        </p>

        <div className="works__buttons">
          {Object.keys(works).map((key) => (
            <button
              key={key}
              className={`works__btn ${active === key ? "active" : ""}`}
              onClick={() => setActive(key as keyof typeof works)}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="works__slider">
        <BeforeAfterSlider
          beforeImg={works[active].before}
          afterImg={works[active].after}
        />
      </div>
    </section>
  );
};
