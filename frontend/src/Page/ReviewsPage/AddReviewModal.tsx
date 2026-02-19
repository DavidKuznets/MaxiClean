import React, { useEffect, useState } from "react";
import "./AddReviewModal.scss";

interface Props {
  onClose: () => void;
  onReviewAdded?: () => void;
}

interface Service {
  id: number;
  name: string;
}

export const AddReviewModal: React.FC<Props> = ({ onClose, onReviewAdded }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "";

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [serviceId, setServiceId] = useState<number | "">("");

  const [fullName, setFullName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const servicesRes = await fetch(`${API_BASE_URL}/api/v1/services/`, {
          credentials: "include",
        });

        if (!servicesRes.ok)
          throw new Error(`Services HTTP ${servicesRes.status}`);

        const servicesJson = await servicesRes.json();
        setServices(servicesJson.results ?? servicesJson);
      } catch (err) {
        console.error("API ERROR:", err);
        setError("Не вдалося завантажити дані");
      }
    };

    loadData();
  }, []);

  // Закриття по ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async () => {
    if (!rating || !content || !fullName) {
      setError("Заповніть усі обовʼязкові поля");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();

    if (serviceId !== "") formData.append("service", String(serviceId));
    formData.append("full_name", fullName);
    formData.append("rating", String(rating));
    formData.append("content", content);

    if (file) formData.append("avatar", file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/reviews/`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const msg = errData
          ? JSON.stringify(errData)
          : "Failed to submit review";
        throw new Error(msg);
      }

      onClose();
      onReviewAdded?.();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Помилка при відправці відгуку");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <p className="text modal__title">Написати відгук</p>

          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Закрити"
          >
            ✕
          </button>
        </div>

        {/* Rating */}
        <div className="stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} onClick={() => setRating(n)} className="star">
              <img
                src={n <= rating ? "/ActiveStar.png" : "/Star.png"}
                alt="Star"
              />
            </span>
          ))}
        </div>

        {/* Full name */}
        <input
          type="text"
          placeholder="Ваше імʼя"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="input"
        />

        {/* Service */}
        <select
          className="select_option"
          value={serviceId}
          onChange={(e) =>
            setServiceId(e.target.value === "" ? "" : Number(e.target.value))
          }
        >
          <option value="">Оберіть категорію</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Review content */}
        <textarea
          placeholder="Напишіть Ваш відгук..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textareaVidguk"
        />

        {/* Upload */}
        <label className="upload">
          <img
            src="/ReviewModalImage.png"
            alt="image"
            className="imageReview"
          />
          <p className="textUp">Перетягніть зображення сюди</p>
          <p className="textDown">або натисніть, щоб завантажити</p>

          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        {file && <p className="file-name">{file.name}</p>}
        {error && <p className="error">{error}</p>}

        {/* Submit */}
        <button
          className="AddResponse"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Надсилання..." : "Додати відгук"}
        </button>
      </div>
    </div>
  );
};
