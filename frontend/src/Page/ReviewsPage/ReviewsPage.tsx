import { useEffect, useState } from "react";
import "./ReviewsPage.scss";
import { FAQ } from "../../Components/Question/FAQ";
import { AddReviewModal } from "./AddReviewModal";

interface Service {
  id: number;
  name: string;
}

interface Review {
  id: number;
  service: Service;
  full_name: string;
  avatar: string | null;
  rating: string;
  content: string;
  created_at: string;
  status: string;
}

export const ReviewsPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [ratingOpen, setRatingOpen] = useState(false);

  const [serviceFilter, setServiceFilter] = useState<
    "all" | "sofas" | "chairs" | "mattresses" | "carpets"
  >("all");

  const [ratingFilter, setRatingFilter] = useState<
    "" | "5" | "4" | "3" | "2" | "1"
  >("");

  const [dateSort, setDateSort] = useState<"" | "new" | "old">("");
  const [serviceOpen, setServiceOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/reviews/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const items: Review[] = data.results ?? data;
        setReviews(items);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const serviceMap = {
    sofas: "Дивани",
    chairs: "Стільці",
    mattresses: "Матраци",
    carpets: "Килими",
  } as const;

  const filteredAndSortedReviews = [...reviews]
    .filter((r) => {
      if (
        serviceFilter !== "all" &&
        r.service?.name !== serviceMap[serviceFilter]
      ) {
        return false;
      }

      if (ratingFilter && Number(r.rating) !== Number(ratingFilter)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (dateSort === "new") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      if (dateSort === "old") {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }

      return 0;
    });

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length
        ).toFixed(1)
      : "0";

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "linear-gradient(135deg,#0044cc,#00c6ff)",
      "linear-gradient(135deg,#ff6b6b,#ff8e53)",
      "linear-gradient(135deg,#7f00ff,#e100ff)",
      "linear-gradient(135deg,#11998e,#38ef7d)",
      "linear-gradient(135deg,#f7971e,#ffd200)",
      "linear-gradient(135deg,#00c9ff,#92fe9d)",
      "linear-gradient(135deg,#ee0979,#ff6a00)",
      "linear-gradient(135deg,#4facfe,#00f2fe)",
      "linear-gradient(135deg,#667eea,#764ba2)",
      "linear-gradient(135deg,#ff512f,#dd2476)",
      "linear-gradient(135deg,#1d2b64,#f8cdda)",
      "linear-gradient(135deg,#11998e,#0575e6)",
      "linear-gradient(135deg,#fc5c7d,#6a82fb)",
      "linear-gradient(135deg,#00b09b,#96c93d)",
    ];

    const index =
      name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;

    return colors[index];
  };

  return (
    <section className="reviews">
      {/* Загальний рейтинг */}
      <div className="reviews__rating">
        <h2>Загальний рейтинг</h2>
        <div className="reviews__rating-value">
          <span>{averageRating}</span>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <img
                key={n}
                src={
                  n <= Math.round(Number(averageRating))
                    ? "/ActiveStar.png"
                    : "/Star.png"
                }
                alt="star"
              />
            ))}
          </div>
          <p>({reviews.length} відгуків)</p>
        </div>
      </div>

      {/* Фільтри */}
      <div className="reviews__filters">
        {/* Сервіс */}
        <div className="dropdown-wrapper">
          <button
            className="dropdown-trigger"
            onClick={() => setServiceOpen(!serviceOpen)}
          >
            {serviceFilter === "all" ? "Сервіс" : serviceMap[serviceFilter]}

            <img src="/Checkmark.png" alt="" />
          </button>

          {serviceOpen && (
            <div className="dropdown-menu">
              {[
                { value: "all", label: "Сервіс" },
                { value: "sofas", label: "Дивани" },
                { value: "chairs", label: "Стільці" },
                { value: "mattresses", label: "Матраци" },
                { value: "carpets", label: "Килими" },
              ].map((item) => (
                <div
                  key={item.value}
                  className="dropdown-item"
                  onClick={() => {
                    setServiceFilter(item.value as never);
                    setServiceOpen(false);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Рейтинг */}
        <div className="dropdown-wrapper">
          <button
            className="dropdown-trigger"
            onClick={() => setRatingOpen(!ratingOpen)}
          >
            {ratingFilter ? `${ratingFilter} ★` : "Рейтинг"}

            <img src="/Checkmark.png" alt="" />
          </button>

          {ratingOpen && (
            <div className="dropdown-menu">
              {["", "5", "4", "3", "2", "1"].map((value) => {
                const labels: Record<string, string> = {
                  "": "Рейтинг",
                  "5": "5 — Відмінно",
                  "4": "4 — Добре",
                  "3": "3 — Нормально",
                  "2": "2 — Слабко",
                  "1": "1 — Погано",
                };

                return (
                  <div
                    key={value}
                    className="dropdown-item"
                    onClick={() => {
                      setRatingFilter(value as never);
                      setRatingOpen(false);
                    }}
                  >
                    {labels[value]}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Сортування по даті */}
        <div className="dropdown-wrapper">
          <button
            className="dropdown-trigger"
            onClick={() => setDateOpen(!dateOpen)}
          >
            {dateSort === ""
              ? "Дата"
              : dateSort === "new"
                ? "Новіші"
                : "Старіші"}

            <img src="/Checkmark.png" alt="" />
          </button>

          {dateOpen && (
            <div className="dropdown-menu">
              {[
                { value: "", label: "Дата" },
                { value: "new", label: "Новіші" },
                { value: "old", label: "Старіші" },
              ].map((item) => (
                <div
                  key={item.value}
                  className="dropdown-item"
                  onClick={() => {
                    setDateSort(item.value as never);
                    setDateOpen(false);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="primary" onClick={() => setIsModalOpen(true)}>
          <img src="/plus.png" alt="Add Review" />
          Додати відгук
        </button>
      </div>

      {loading && <p>Завантаження відгуків...</p>}
      {error && <p className="error">Помилка: {error}</p>}

      {/* Список відгуків */}
      <div className="reviews__grid">
        {filteredAndSortedReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-card__header">
              <div
                className="review-card__avatar--placeholder"
                style={{
                  background: getAvatarColor(review.full_name),
                }}
              >
                {review.full_name.charAt(0)}
              </div>

              <div className="review-card__meta">
                <strong>{review.full_name}</strong>
              </div>

              <div className="review-card__rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <img
                    key={n}
                    src={
                      n <= Number(review.rating)
                        ? "/ActiveStar.png"
                        : "/Star.png"
                    }
                    alt="star"
                  />
                ))}
              </div>
            </div>

            <p
              className={`review-card__text ${
                expandedId !== review.id ? "review-card__text--collapsed" : ""
              }`}
            >
              {review.content}
            </p>

            {review.avatar && (
              <div className="review-card__image-wrapper">
                <img
                  src={
                    review.avatar.startsWith("http")
                      ? review.avatar
                      : `${API_BASE_URL}${review.avatar}`
                  }
                  alt="review"
                  className="review-card__image"
                />
              </div>
            )}

            {review.content.length > 300 && (
              <button
                className="read-more"
                onClick={() =>
                  setExpandedId(expandedId === review.id ? null : review.id)
                }
              >
                {expandedId === review.id ? "Згорнути" : "Читати повністю"}
              </button>
            )}

            <div className="review-card__footer">
              <span className="service-name">
                Сервіс: {review.service?.name}
              </span>
              <span>{formatDate(review.created_at)}</span>
            </div>
          </div>
        ))}
      </div>

      <FAQ />

      {isModalOpen && <AddReviewModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};
