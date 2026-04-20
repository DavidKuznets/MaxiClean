# 🧹 MaxiClean — Сайт служби професійної чистки меблів

> **Повнофункціональний веб-додаток для управління послугами професійної чистки меблів та килимів. Побудований з використанням Django REST Framework та React з TypeScript.**

---

## 📋 Огляд проекту

**MaxiClean** — це комерційний веб-додаток, розроблений для компанії, яка надає послуги професійної чистки:

- 🛋️ Чистка диванів, крісел та килимів
- 📸 Портфоліо робіт (галерея до/після)
- ⭐ Система відгуків клієнтів
- 📞 Форма зворотного зв'язку з Telegram-інтеграцією
- 👥 Страниця персоналу та поточних проектів
- 📱 Повна адаптивність для мобільних пристроїв

---

## 🚀 Основні можливості

### 📱 **Frontend**

- **React 19** + **TypeScript** для типобезпечної розробки
- **Vite** як збирач модулів для швидкої розробки
- **React Router** для маршрутизації між сторінками
- **SCSS** з чистою архітектурою та mixins
- **Leaflet** для інтерактивних карт
- Повнофункціональна адаптивна верстка (RWD)
- Слайдери до/після для демонстрації результатів
- Модальні вікна для галереї та звернення

**Сторінки:**

- 🏠 Головна сторінка з героїнекцією та пропозиціями
- 🛒 Сторінка послуг з категоріями (диван, килим, матрац, крісло)
- 📷 Портфоліо роботи (до/після)
- ⭐ Сторінка відгуків з модерацією
- 📞 Контактна форма з Telegram-сповіщеннями
- ℹ️ Сторінка "Про нас"

### 🔧 **Backend (Django REST Framework)**

- **Django 4.2** + **DRF** для REST API
- **PostgreSQL** (Cloud SQL на GCP) для продакшену
- **SQLite** для локальної розробки
- **WhiteNoise** для обслуговування статичних файлів
- **CORS** налаштування для кросс-доменних запитів
- **Admin Panel** для управління вмістом

**Моделі даних:**

- `Review` — Відгуки клієнтів з модерацією
- `ServiceCategory` — Категорії послуг з описом та фото
- `ServiceWork` — Портфоліо роботи (до/після фото)
- `Question` — ЧаПи (Часті питання)
- `OurStaff` — Профілі членів команди
- `CallbackRequest` — Запити зворотного зв'язку
- `Occupation` — Типи занять клієнтів для аналізу

**API Endpoints:**

```
GET  /api/v1/reviews/           — Отримати всі схвалені відгуки
POST /api/v1/reviews/           — Створити новий відгук
GET  /api/v1/services/          — Отримати всі послуги
GET  /api/v1/questions/         — Отримати ЧаПи
GET  /api/v1/staff/             — Отримати персонал
POST /api/v1/callbacks/         — Відправити запит зворотного зв'язку
```

### 🏗️ **Архітектура**

- Микросервісна структура: `/backend` та `/frontend` як окремі проекти
- Docker + Docker Compose для контейнеризації
- Git для версіонування
- `.env` конфігурація для різних середовищ

---

## 🛠️ Використані технології

### **Frontend**

```
├── React 19.1.1         — UI бібліотека
├── TypeScript 5.8       — Статична типізація
├── Vite 7.1             — Збирач модулів
├── React Router 7.8     — Маршрутизація
├── SCSS                 — Препроцесор CSS
├── Leaflet 1.9          — Інтерактивні карти
└── ESLint               — Статичний аналіз кода
```

### **Backend**

```
├── Django 4.2           — Веб-фреймворк
├── DRF 3.14             — REST API
├── PostgreSQL           — База даних (продакшен)
├── Gunicorn 21.2        — WSGI сервер
├── WhiteNoise 6.4       — Статичні файли
├── Psycopg2             — PostgreSQL драйвер
├── CORS Headers         — Кросс-доменні запити
└── Python-Decouple      — Керування конфігурацією
```

### **Інфраструктура**

- 🐳 **Docker & Docker Compose** — контейнеризація
- ☁️ **Google Cloud Platform (App Engine)** — хостинг
- 🗄️ **Google Cloud SQL** — керована база даних
- 📨 **Telegram Bot API** — сповіщення про запити

---

## 🚀 Швидкий старт

### **Локальна розробка**

#### **1. Клонування репозиторію**

```bash
git clone <repo-url>
cd MaxiClean
```

#### **2. Встановлення залежностей Frontend**

```bash
cd frontend
npm install
npm run dev
```

Frontend буде доступний на `http://localhost:5173`

#### **3. Встановлення залежностей Backend**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Міграції
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend буде доступний на `http://localhost:8000`
Admin Panel: `http://localhost:8000/admin`

#### **4. Запуск обох сервісів одночасно**

```bash
npm run dev  # З кореня проекту
```

### **Docker запуск**

```bash
docker-compose up -d --build
```

---

## 📁 Структура проекту

```
MaxiClean/
├── backend/
│   ├── config/              # Django конфіги (settings, urls, wsgi)
│   ├── core/
│   │   ├── models.py        # Усі моделі даних
│   │   ├── views.py         # REST API ViewSets
│   │   ├── serializers.py   # DRF Serializers
│   │   ├── urls.py          # API маршрути
│   │   └── management/      # Custom Django команди
│   ├── media/               # Завантажені користувачами файли
│   ├── staticfiles/         # Зібрані статичні файли
│   ├── requirements.txt     # Python залежності
│   ├── Dockerfile
│   └── app.yaml             # GCP App Engine конфіг
│
├── frontend/
│   ├── src/
│   │   ├── Components/      # Переиспользуемые компоненти
│   │   │   ├── Header/      # Навігація
│   │   │   ├── Footer/      # Нижній колонтитул
│   │   │   ├── ServiceCards/
│   │   │   ├── BeforeAfterSlider/
│   │   │   └── ...
│   │   ├── Page/            # Повні сторінки
│   │   │   ├── HomePage/
│   │   │   ├── ServicePage/
│   │   │   ├── ReviewsPage/
│   │   │   ├── ContactsPage/
│   │   │   └── ...
│   │   ├── Style/           # Глобальні стилі
│   │   ├── utils/           # Утиліти (API, CSRF)
│   │   ├── App.tsx          # Маршрутизація
│   │   └── main.tsx         # Точка входу
│   ├── public/              # Статичні ресурси
│   ├── vite.config.ts       # Конфіг Vite
│   ├── tsconfig.json        # TypeScript конфіг
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml       # Docker Compose конфіг
├── DEPLOYMENT_GUIDE.md      # Гайд деплойменту
└── README.md                # Цей файл
```

---

## 🔗 API Документація

### **ReviewViewSet**

```
GET  /api/v1/reviews/           Отримати всі схвалені відгуки
POST /api/v1/reviews/           Створити новий відгук
```

### **ServiceCategoryViewSet**

```
GET  /api/v1/services/          Отримати активні категорії послуг
```

### **QuestionViewSet**

```
GET  /api/v1/questions/         Отримати всі питання
```

### **OurStaffViewSet**

```
GET  /api/v1/staff/             Отримати членів команди
```

### **CallbackRequestViewSet**

```
POST /api/v1/callbacks/         Відправити запит зворотного зв'язку
```

---

## 🔐 Miljøvariabler

### **Backend (`.env` або `app.yaml`)**

```env
DEBUG=False
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=maxiclean.time,www.maxiclean.time
DB_NAME=maxiclean
DB_USER=postgres
DB_PASSWORD=secure_password
DB_HOST=/cloudsql/project-id:region:instance-name
CORS_ALLOWED_ORIGINS=https://maxiclean.time,https://www.maxiclean.time
CSRF_TRUSTED_ORIGINS=https://maxiclean.time,https://www.maxiclean.time
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### **Frontend (`.env.production`)**

```env
VITE_API_BASE_URL=https://maxiclean.time/api/v1
```

---

## 📊 Особливості розробки

### **Backend**

✅ Admin Panel для управління вмістом
✅ Модерація відгуків перед публікацією
✅ Автоматичні Telegram сповіщення про запити
✅ Система статусів для занять клієнтів
✅ Переписування файлів з OverwriteStorage
✅ CSRF та CORS захист

### **Frontend**

✅ TypeScript для типобезпечності
✅ Компонентна архітектура
✅ Реактивні компоненти з React Hooks
✅ Слайдери до/після для демонстрації
✅ Адаптивний дизайн (mobile-first)
✅ SEO-оптимізація

---

## 🚀 Деплоймент

### **На Google Cloud Platform (GCP)**

1. Встановіть Google Cloud SDK
2. Налаштуйте проект та Cloud SQL базу
3. Збудуйте frontend: `npm run build`
4. Запустіть: `gcloud app deploy`
5. Міграції: `gcloud app exec -- python manage.py migrate`

Детальний гайд: див. [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md)

---

## 📝 Ліцензія

Цей проект розроблений як комерційне рішення для MaxiClean.

---

## 👤 Автор

**Frontend:** David Kuznets
**Backend:** Marharyta Zazulia


Розроблено як full-stack веб-додаток з фокусом на:

- ✅ Чистоту кода та архітектури
- ✅ Типобезпечність (TypeScript)
- ✅ Масштабованість
- ✅ User Experience (UX)
- ✅ Mobile-first дизайн

---

## 🤝 Зв'язок

📧 **Email:** contact@maxiclean.time
📱 **Telegram:** @maxiclean_bot
🌐 **Сайт:** https://maxiclean.pro/

---

**Побудовано з ❤️ для якісної послуги чистки.**
