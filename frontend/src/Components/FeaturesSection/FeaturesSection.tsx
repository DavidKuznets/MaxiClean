// src/Components/FeaturesSection/FeaturesSection.tsx
import React from "react";
import "./FeaturesSection.scss";

export const FeaturesSection = () => {
  return (
    <section className="features">
      <div className="features__grid">
        <div className="feature-card">
          <img src="/equipment.png" alt="Сучасне обладнання" />
          <p>Сучасне обладнання</p>
        </div>
        <div className="feature-card">
          <img src="/chemistry.png" alt="Професійні засоби" />
          <p>Професійні засоби</p>
        </div>
        <div className="feature-card">
          <img src="/care.png" alt="Турбота до ваших меблів" />
          <p>Турбота до ваших меблів</p>
        </div>
        <div className="feature-card">
          <img src="/convenientTime.png" alt="В зручний для вас час" />
          <p>В зручний для вас час</p>
        </div>
      </div>
      <div className="features__image">
        <img src="/HomePageLogo-2.png" alt="cleaning sofa" />
      </div>
    </section>
  );
};
