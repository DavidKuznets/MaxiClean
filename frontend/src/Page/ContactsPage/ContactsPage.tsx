import React from "react";
import "./ContactsPage.scss";
import { ContactsPageDetails } from "../../Components/ContactsPageDetails/ContactsPageDetails";
import { FAQ } from "../../Components/Question/FAQ";

export const ContactsPage = () => {
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

          <form className="contacts-form">
            <input type="text" placeholder="Ваше ім’я" />
            <input type="tel" placeholder="Номер телефону" />

            <button type="submit">
              <img src="/Phone.png" alt="phone-icon" />
              Передзвоніть мені
            </button>
          </form>

          <label className="contacts-consent">
            <input type="checkbox" />
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
