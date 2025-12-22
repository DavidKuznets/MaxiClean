// WorksSection.tsx
import React, { useState, useEffect } from "react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import "./WorksSection.scss";
import { useLocation } from "react-router-dom";

const works = {
  Матраци: {
    before: "/before-1.jpg",
    after: "/after-1.jpg",
  },
  "Килимові покриття": {
    before: "/before-6.png",
    after: "/after-6.png",
  },
  Дивани: {
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
  const location = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pathToKey: Record<string, keyof typeof works> = {
    "/services/soft-furniture": "Дивани",
    "/services/carpets": "Килимові покриття",
    "/services/mattresses": "Матраци",
    "/services/car-interior": "Стільці",
  };

  useEffect(() => {
    // 1) Если при переходе передали state через Link: <Link to="/..." state={{ key: "Дивани" }}>
    const state =
      (location.state as { key?: keyof typeof works } | null) ?? null;
    const stateKey = state?.key;
    if (stateKey && works[stateKey]) {
      setActive(stateKey);
      return;
    }

    // 2) Иначе — по pathname
    const byPath = pathToKey[location.pathname];
    if (byPath) setActive(byPath);
  }, [location.pathname, location.state, pathToKey]);

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
