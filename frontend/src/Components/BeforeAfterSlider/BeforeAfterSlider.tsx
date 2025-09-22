// BeforeAfterSlider.tsx
import React from "react";
import "./BeforeAfterSlider.scss";

type Props = {
  beforeImg: string;
  afterImg: string;
};

export const BeforeAfterSlider: React.FC<Props> = ({ beforeImg, afterImg }) => {
  return (
    <div className="before-after">
      <div className="before-after__item">
        <img src={beforeImg} alt="Before" className="before-after__img" />
        <span className="before-after__label">До</span>
      </div>
      <div className="before-after__item">
        <img src={afterImg} alt="After" className="before-after__img" />
        <span className="before-after__label">Після</span>
      </div>
    </div>
  );
};
