// BeforeAfterSlider.tsx
import React from "react";
import "./BeforeAfterSlider.scss";

type Props = {
  beforeImg: string;
  afterImg: string;
};

export const BeforeAfterSlider: React.FC<Props> = ({ beforeImg, afterImg }) => {
  return (
    <div className="before-after fade-switch">
      <div className="before-after__item">
        <img key={beforeImg} src={beforeImg} alt="Before" />
        <span className="before-after__label">До</span>
      </div>

      <div className="before-after__item">
        <img key={afterImg} src={afterImg} alt="After" />
        <span className="before-after__label">Після</span>
      </div>
    </div>
  );
};
