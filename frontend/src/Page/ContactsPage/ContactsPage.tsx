import React, { useState } from "react";
import "./ContactsPage.scss";
import { ContactsPageDetails } from "../../Components/ContactsPageDetails/ContactsPageDetails";
import { FAQ } from "../../Components/Question/FAQ";
import { ensureCsrfToken } from "../../utils/csrf";

export const ContactsPage = () => {
  const [consentChecked, setConsentChecked] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const CALLBACKS_ENDPOINT = `${API_BASE_URL}/api/v1/callbacks/`;

  const submitCallback = async (form: HTMLFormElement, photo?: File | null) => {
    const full_name = (form.elements.namedItem("full_name") as HTMLInputElement)
      .value;
    const phone_number = (
      form.elements.namedItem("phone_number") as HTMLInputElement
    ).value;
    const addition =
      (form.elements.namedItem("addition") as HTMLInputElement)?.value || "";

    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("phone_number", phone_number);
    formData.append("addition", addition);
    if (photo) formData.append("photo", photo);

    const csrfToken = await ensureCsrfToken(API_BASE_URL);
    const res = await fetch(CALLBACKS_ENDPOINT, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      body: formData,
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ detail: "Невідома помилка" }));
      throw new Error(`Помилка ${res.status}: ${errorData.detail}`);
    }

    return res.json();
  };
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!consentChecked) {
      alert("Будь ласка, дайте згоду на обробку персональних даних.");
      return;
    }

    const form = e.currentTarget;

    try {
      await submitCallback(form, photo);
      alert("Заявку відправлено успішно!");
      form.reset();
      setConsentChecked(false);
      setPhoto(null);
    } catch (err) {
      console.error(err);
      alert(
        `Помилка відправки: ${err instanceof Error ? err.message : "Невідома помилка"}`,
      );
    }
  };

  return (
    <div className="contacts-page">
      <ContactsPageDetails />

      <div className="contacts-info contacts-info--with-margin">
        <div className="contacts-info__left">
          <h1 className="contacts-info__title">MaxiClean</h1>
        </div>

        <div className="contacts-info__right">
          <p className="contacts-info__text">
            Зв’яжемося з вами протягом 15 хвилин, щоб відповісти на всі
            запитання та розрахувати вартість.
          </p>

          <form className="contacts-form" onSubmit={handleContactSubmit}>
            <input
              type="text"
              name="full_name"
              placeholder="Ваше ім’я"
              required
            />
            <input
              type="tel"
              name="phone_number"
              placeholder="Номер телефону"
              required
            />
            <button type="submit">
              <img src="/Phone.png" alt="phone-icon" />
              Передзвоніть мені
            </button>
          </form>

          <label className="contacts-upload">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            />
            <img className="form-img" src="/ReviewModalImage.png" alt="" />
            <p className="textUp__photo">Додати фото</p>
            <p className="textDown__photo">PNG, JPG до 10MB</p>
            {photo && (
              <span className="contacts-upload__file">{photo.name}</span>
            )}
          </label>

          <label className="contacts-consent">
            <input
              type="checkbox"
              name="consent"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
            />
            Даю згоду на обробку своїх персональних даних
          </label>
        </div>
      </div>

      <section className="service-areas">
        <p className="service-areas__title">
          Райони міста Київ, в яких ми працюємо
        </p>

        <div className="service-areas__card">
          <div className="service-areas__column">
            <label>
              <input type="checkbox" checked readOnly /> Оболонський
            </label>
            <ul>
              <li>Героїв Дніпра</li>
              <li>Мінська</li>
              <li>Оболонь</li>
              <li>Петрівка</li>
              <li>Почайна</li>
            </ul>

            <label>
              <input type="checkbox" checked readOnly /> Деснянський
            </label>
            <ul>
              <li>Троєщина</li>
              <li>Лісова</li>
              <li>Чернігівська</li>
            </ul>

            <label>
              <input type="checkbox" checked readOnly /> Подільський
            </label>
            <ul>
              <li>Поділ</li>
              <li>Виноградар</li>
              <li>Куренівка</li>
            </ul>

            <label>
              <input type="checkbox" checked readOnly /> Святошинський
            </label>
            <ul>
              <li>Академмістечко</li>
              <li>Житомирська</li>
              <li>Борщагівка</li>
            </ul>
          </div>

          <div className="service-areas__column">
            <label>
              <input type="checkbox" checked readOnly /> Дніпровський
            </label>
            <ul>
              <li>Гідропарк</li>
              <li>Лівобережна</li>
              <li>Дарниця</li>
              <li>Чернігівська</li>
            </ul>

            <label>
              <input type="checkbox" checked readOnly /> Голосіївський
            </label>
            <ul>
              <li>Голосієво</li>
              <li>Площа Льва Толстого</li>
              <li>Олімпійська</li>
              <li>ВДНГ</li>
              <li>Теремки</li>
            </ul>

            <label>
              <input type="checkbox" checked readOnly /> Печерський
            </label>
            <ul>
              <li>Печерськ</li>
              <li>Арсенальна</li>
              <li>Палац Україна</li>
            </ul>

            <label>
              <input type="checkbox" checked readOnly /> Соломʼянський
            </label>
            <ul>
              <li>Соломʼянка</li>
              <li>Відрадний</li>
              <li>Караваєві дачі</li>
            </ul>
          </div>
        </div>

        <p className="service-areas__title">
          Ми також працюємо за межами Києва
        </p>

        <div className="service-areas__card">
          <div className="service-areas__column">
            <label>
              <input type="checkbox" checked readOnly /> Київська область
            </label>
            <ul>
              <li>Ірпінь</li>
              <li>Буча</li>
              <li>Гостомель</li>
              <li>Вишневе</li>
              <li>Бровари</li>
              <li>Боярка</li>
              <li>Васильків</li>
              <li>Обухів</li>
              <li>Українка</li>
            </ul>
          </div>
          <div className="service-areas__column">
            <label>
              <input type="checkbox" checked readOnly /> Напрямки
            </label>
            <ul>
              <li>Козин</li>
              <li>Конча-Заспа</li>
              <li>Підгірці</li>
              <li>Круглик</li>
              <li>Романків</li>
              <li>Кременище</li>
            </ul>
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
};
