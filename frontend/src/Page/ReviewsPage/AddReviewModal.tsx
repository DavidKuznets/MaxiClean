import React, { useEffect, useState } from "react";
import "./AddReviewModal.scss";

interface Props {
  onClose: () => void;
  onReviewAdded?: () => void; // для оновлення списку відгуків
}

interface Service {
  id: number;
  name: string;
}

interface Occupation {
  id: number;
  name: string;
}

export const AddReviewModal: React.FC<Props> = ({ onClose, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [occupations, setOccupations] = useState<Occupation[]>([]);

  const [serviceId, setServiceId] = useState<number | "">("");
  const [occupationId, setOccupationId] = useState<number | "">("");

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Завантаження селектів
  useEffect(() => {
    fetch("/api/v1/services/")
      .then((res) => res.json())
      .then(setServices)
      .catch(() => setError("Не вдалося завантажити категорії"));

    fetch("/api/v1/occupations/")
      .then((res) => res.json())
      .then(setOccupations)
      .catch(() => setError("Не вдалося завантажити види занять"));
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
    if (
      !serviceId ||
      !occupationId ||
      !rating ||
      !content ||
      !fullName ||
      !gender
    ) {
      setError("Заповніть усі обовʼязкові поля");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("service", String(serviceId));
    formData.append("occupation", String(occupationId));
    formData.append("full_name", fullName);
    formData.append("gender", gender);
    formData.append("rating", String(rating));
    formData.append("content", content);
    if (file) formData.append("avatar", file);

    try {
      const res = await fetch("/api/v1/reviews/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit review");

      onClose();
      if (onReviewAdded) onReviewAdded(); // рефетч списку відгуків
    } catch {
      setError("Помилка при відправці відгуку");
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="#000D2C"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
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

        {/* Gender */}
        <select
          className="select_option"
          value={gender}
          onChange={(e) => setGender(e.target.value as "male" | "female")}
        >
          <option value="" disabled>
            Стать
          </option>
          <option value="male">Чоловіча</option>
          <option value="female">Жіноча</option>
        </select>

        {/* Service */}
        <select
          className="select_option"
          value={serviceId}
          onChange={(e) =>
            setServiceId(e.target.value === "" ? "" : Number(e.target.value))
          }
        >
          <option value="" disabled>
            Оберіть категорію
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Occupation */}
        <select
          className="select_option"
          value={occupationId}
          onChange={(e) =>
            setOccupationId(e.target.value === "" ? "" : Number(e.target.value))
          }
        >
          <option value="" disabled>
            Вид діяльності
          </option>
          {occupations.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
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
            src="/public/ReviewModalImage.png"
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
          <img
            src="/public/AddResponse.png"
            alt="addResponseImage"
            className="addResponseImage"
          />
          {loading ? "Надсилання..." : "Додати відгук"}
        </button>
      </div>
    </div>
  );
};
