import "./ServiceCards.scss";
import BlueArrow from "../../../public/blue-arrow.svg";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export const ServiceCards = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 150); // поетапна поява
          }
        });
      },
      { threshold: 0.2 },
    );

    cardsRef.current.forEach((card) => card && observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <section className="services">
      <h2>Наші послуги</h2>
      <p>
        Ми надаємо комплекс професійних рішень, створених для того, щоб ваша
        оселя чи офіс завжди були чистими, затишними та безпечними.
      </p>

      <div className="services__grid">
        {[
          {
            img: "/MaxiClean-1.png",
            title: "Диванів",
            price: "від 1800₴",
            link: "/services/sofa",
          },
          {
            img: "/MaxiClean-2.png",
            title: "Килимові покриття",
            price: "від 200₴ за 1 м²",
            link: "/services/carpets",
          },
          {
            img: "/MaxiClean-3.png",
            title: "Матраци",
            price: "від 900₴",
            link: "/services/mattresses",
          },
          {
            img: "/Chair.webp",
            title: "Стільці",
            price: "від 350₴",
            link: "/services/chair",
          },
        ].map((card, index) => (
          <div
            key={index}
            ref={(el) => setRef(el, index)}
            className="service-card fade-up"
          >
            <img
              src={card.img}
              alt={card.title}
              className="service-card__image"
            />

            <div className="service-card__info">
              <div>
                <h5>Хімчистка</h5>
                <h3>{card.title}</h3>
                <p>{card.price}</p>
              </div>

              <Link to={card.link} className="service-card__arrow">
                <img src={BlueArrow} alt="Детальніше" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
