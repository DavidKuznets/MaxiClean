# 🚀 Швидкий старт - Deploy на GCP

## ⚡ За 10 хвилин до запуску

### 1️⃣ Встановіть Google Cloud SDK

**Для Windows:**

- Скачайте: https://cloud.google.com/sdk/docs/install-windows
- Запустіть інсталер
- Поточно перезавантажте terminal

**Для Mac/Linux:**

```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### 2️⃣ Авторизація та налаштування

```bash
# Авторизуйтеся з Google акаунтом
gcloud auth login

# Вибери свій GCP проект
gcloud config set project YOUR-PROJECT-ID

# Активуйте потрібні APIs
gcloud services enable appengine
gcloud services enable sqladmin
gcloud services enable storage-api
gcloud services enable compute
```

### 3️⃣ Налаштування бази даних

```bash
# Створіть PostgreSQL базу (перший раз)
gcloud sql instances create maxiclean-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --no-backup

# Встановіть пароль
gcloud sql users set-password postgres \
  --instance=maxiclean-db \
  --password=ТВІЙ_ПАРОЛЬ_ТУТSUDO_

# Скопіюйте connection string
gcloud sql instances describe maxiclean-db --format="value(connectionName)"
# Результат виглядатиме як: PROJECT_ID:us-central1:maxiclean-db
```

### 4️⃣ Оновіть backend конфіг

**Файл: `backend/.env`**

```
DEBUG=False
SECRET_KEY=django-insecure-ТВІЙ-СУПЕРСЕКРЕТНИЙ-КЛЮЧ-ЯКИЙ-СКЛАДАЄТЬСЯ-З-50-СИМВОЛІВ
ALLOWED_HOSTS=maxiclean.time,www.maxiclean.time
DB_NAME=maxiclean
DB_USER=postgres
DB_PASSWORD=ТВІЙ_ПАРОЛЬ_ТУТSUDO_
DB_HOST=/cloudsql/PROJECT_ID:us-central1:maxiclean-db
CORS_ALLOWED_ORIGINS=https://maxiclean.time,https://www.maxiclean.time
CSRF_TRUSTED_ORIGINS=https://maxiclean.time,https://www.maxiclean.time
```

**Файл: `backend/app.yaml`**

Замініть у файлі `app.yaml`:

- `ALLOWED_HOSTS: "maxiclean.time,www.maxiclean.time"` ✓ (залиште як є)
- Додайте ваш `SECRET_KEY` та інші змінні

### 5️⃣ Оновіть frontend для production

**Файл: `frontend/.env.production`**

```
VITE_API_BASE_URL=https://maxiclean.time/api/v1
```

### 6️⃣ Запустіть deployment

**Для Windows (Git Bash або PowerShell):**

```bash
./deploy.bat
```

**Для Mac/Linux:**

```bash
bash deploy.sh
```

### 7️⃣ Налаштуйте домен

Ваш домен `maxiclean.time` потрібно спрямувати на GCP.

1. Переконайтеся, у якого реєстратора домена `maxiclean.time`
2. Знайдіть GCP Load Balancer IP в консолі
3. У налаштуваннях DNS додайте:

```
A Record:    maxiclean.time  →  [GCP IP]
CNAME Record: www              →  maxiclean.time
```

Оновлення DNS може зайняти до 24 годин.

### 8️⃣ SSL сертифікат

GCP автоматично видаст безплатний SSL сертифікат від Google-managed certificates.

## 📊 Вартість

| Сервіс        | Ціна               |
| ------------- | ------------------ |
| App Engine    | $20-40/місяць      |
| Cloud SQL     | $8-15/місяць       |
| Cloud Storage | $0.02/GB           |
| **TOTAL**     | **~$30-60/місяць** |

Перший місяць Google дає $300 кредиту.

## 🔍 Перевірка статусу

```bash
# Дивіться логи
gcloud app logs read --limit 50

# Тестуйте API
curl https://maxiclean.time/api/v1/callbacks/

# Статус додатка
gcloud app describe
```

## ⚠️ Якщо щось не працює

### Помилка: "gcloud not found in PATH"

- Перезавантажте terminal/IDE
- Переустановіть Google Cloud SDK

### Помилка: "Permission denied"

```bash
gcloud auth login
gcloud auth application-default login
```

### Помилка: "Database connection failed"

- Перевірте в app.yaml: чи правильний connection string?
- Дивіться на GCP консолі → Cloud SQL → Connections

### Помилка: "Static files not found"

```bash
cd backend
python manage.py collectstatic --noinput
```

## 📚 Посилання

- GCP Docs: https://cloud.google.com/docs
- App Engine: https://cloud.google.com/appengine/docs
- Cloud SQL: https://cloud.google.com/sql/docs
- Django на GCP: https://cloud.google.com/python/django/appengine

---

**Все налаштовано?** Запустіть `./deploy.bat` або `bash deploy.sh` 🎉
