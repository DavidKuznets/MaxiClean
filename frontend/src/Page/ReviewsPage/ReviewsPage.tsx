import React, { useEffect, useState } from "react";
import "./ReviewsPage.scss";
import { FAQ } from "../../Components/Question/FAQ";
import { AddReviewModal } from "./AddReviewModal";

interface Service {
  id: number;
  name: string;
}

interface Occupation {
  id: number;
  name: string;
}

interface Review {
  id: number;
  service: Service;
  full_name: string;
  gender: string;
  occupation: Occupation;
  avatar: string | null;
  rating: string;
  content: string;
  created_at: string;
  status: string;
}

export const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"" | "rating" | "date" | "service">("");
  const [serviceFilter, setServiceFilter] = useState<
    "all" | "sofas" | "chairs" | "mattresses" | "carpets"
  >("all");

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/reviews/");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const items: Review[] = data.results ?? data;
        setReviews(items);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load reviews");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const filteredAndSortedReviews = [...reviews]
    .filter((r) => {
      if (serviceFilter === "all") return true;
      return r.service?.name === serviceMap[serviceFilter];
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return Number(b.rating) - Number(a.rating);
      }

      if (sortBy === "date") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      if (sortBy === "service") {
        return a.service?.name.localeCompare(b.service?.name);
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

  const serviceMap = {
    sofas: "Дивани",
    chairs: "Стільці",
    mattresses: "Матраси",
    carpets: "Килими",
  } as const;

  return (
    <section className="reviews">
      {/* Загальний рейтинг */}
      <div className="reviews__rating">
        <h2>Загальний рейтинг</h2>
        <div className="reviews__rating-value">
          <span>{averageRating}</span>
          <div className="stars">
            {"★".repeat(Math.round(Number(averageRating)))}
            {"☆".repeat(5 - Math.round(Number(averageRating)))}
          </div>
          <p>({reviews.length} відгуків)</p>
        </div>
      </div>

      {/* Фільтри */}
      <div className="reviews__filters">
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "" | "rating" | "date" | "service")
          }
          className="reviews__service-style"
        >
          <option value="">Без сортування</option>
          <option value="rating">За рейтингом</option>
          <option value="date">За датою</option>
        </select>

        <select
          value={serviceFilter}
          onChange={(e) =>
            setServiceFilter(
              e.target.value as
                | "all"
                | "sofas"
                | "chairs"
                | "mattresses"
                | "carpets",
            )
          }
          className="reviews__service-style"
        >
          <option value="all">Всі сервіси</option>
          <option value="sofas">Дивани</option>
          <option value="chairs">Стільці</option>
          <option value="mattresses">Матраци</option>
          <option value="carpets">Килими</option>
        </select>

        <button className="primary" onClick={() => setIsModalOpen(true)}>
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
              {review.avatar ? (
                <img
                  src={review.avatar}
                  alt={review.full_name}
                  className="review-card__avatar"
                />
              ) : (
                <div className="review-card__avatar--placeholder">
                  {review.full_name.charAt(0)}
                </div>
              )}

              <div className="review-card__meta">
                <strong>{review.full_name}</strong>
                <span>{formatDate(review.created_at)}</span>
              </div>

              <div className="review-card__rating">
                {"★".repeat(Number(review.rating))}
              </div>
            </div>

            <p
              className={`review-card__text ${
                expandedId !== review.id ? "review-card__text--collapsed" : ""
              }`}
            >
              {review.content}
            </p>

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
              <span className="service-name">{review.service?.name}</span>
              <span className="occupation">{review.occupation?.name}</span>
            </div>
          </div>
        ))}
      </div>

      <FAQ />

      {isModalOpen && <AddReviewModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};
