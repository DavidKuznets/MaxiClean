import "./ReviewsPage.scss";

const reviews = [
  {
    name: "Лівова Ольга",
    date: "14 листопада, 2023",
    rating: 5,
    text:
      "Дуже задоволена якістю сервісу. Майстер приїхав вчасно, все зробив швидко та акуратно.",
  },
  {
    name: "Іванов Костянтин",
    date: "5 листопада, 2023",
    rating: 5,
    text:
      "Професійний підхід та чудовий результат. Однозначно рекомендую!",
  },
  {
    name: "Кириленко Ілля",
    date: "21 жовтня, 2023",
    rating: 4,
    text:
      "Хороший сервіс, меблі стали значно чистіші. Буду звертатися ще.",
  },
];

export const ReviewsPage = () => {
  return (
    <section className="reviews">
      {/* Загальний рейтинг */}
      <div className="reviews__rating">
        <h2>Загальний рейтинг</h2>
        <div className="reviews__rating-value">
          <span>4.9</span>
          <div className="stars">★★★★★</div>
          <p>(638 відгуків)</p>
        </div>
      </div>

      {/* Фільтри */}
      <div className="reviews__filters">
        <button>Всі</button>
        <button>5 ⭐</button>
        <button>4 ⭐</button>
        <button>З фото</button>
        <button className="primary">Додати відгук</button>
      </div>

      {/* Список відгуків */}
      <div className="reviews__grid">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-card__rating">
              {"★".repeat(review.rating)}
            </div>

            <p className="review-card__text">{review.text}</p>

            <div className="review-card__footer">
              <strong>{review.name}</strong>
              <span>{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
