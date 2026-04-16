# 🚀 Deployment Guide - Google Cloud Platform

## Кроки для deploy на GCP

### 1. **Підготовка на локальній машині**

```bash
# Встановіть Google Cloud SDK
# https://cloud.google.com/sdk/docs/install

# Авторизуйтеся
gcloud auth login

# Встановіть проект
gcloud config set project YOUR_PROJECT_ID

# Запустіть цю команду, щоб вибрати регіон
gcloud app regions list
gcloud config set app/region us-central
```

### 2. **Оновіть backend/requirements.txt**

Додайте ці пакети для GCP:

```
Django==4.2.0

djangorestframework==3.14.0
django-cors-headers==4.0.0
python-decouple==3.8
gunicorn==21.2.0
whitenoise==6.4.0
psycopg2-binary==2.9.6
google-cloud-storage==2.10.0
google-cloud-sql-connector==1.4.3     
```

Запустіть:

```bash
pip freeze > backend/requirements.txt
```

### 3. **Оновіть backend/config/settings.py**

Додайте на початку файлу:

```python
import os
from decouple import config

# GCP Settings
DEBUG = config('DEBUG', default=False, cast=bool)
SECRET_KEY = config('SECRET_KEY', default='your-secret-key-for-dev')
ALLOWED_HOSTS = config('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Database - GCP Cloud SQL
if os.getenv('GAE_RUNTIME'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': config('DB_NAME'),
            'USER': config('DB_USER'),
            'PASSWORD': config('DB_PASSWORD'),
            'HOST': config('DB_HOST'),
            'PORT': '5432',
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Middleware для WhiteNoise
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Додайте цю лінію
    ...
]

# CORS
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    'http://localhost:5173,http://localhost:3000'
).split(',')

CSRF_TRUSTED_ORIGINS = config(
    'CSRF_TRUSTED_ORIGINS',
    'http://localhost:5173,http://localhost:3000'
).split(',')

CSRF_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SAMESITE = 'None' if not DEBUG else 'Lax'
SESSION_COOKIE_SECURE = not DEBUG

# Email (для контактних форм)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

### 4. **Оновіть frontend/.env.production**

Створіть файл `frontend/.env.production`:

```
VITE_API_BASE_URL=https://maxiclean.time/api/v1
```

З файлу `frontend/vite.config.ts` переконайтеся, що у вас є proxy налаштування.

### 5. **Оновіть backend/Dockerfile**

```dockerfile
FROM python:3.9-slim

WORKDIR /app

# Встановіть системні залежності
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Скопіюйте requirements
COPY backend/requirements.txt ./

# Встановіть Python залежності
RUN pip install --no-cache-dir -r requirements.txt

# Скопіюйте код
COPY backend/ .

# Зберіть static файли
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8080

# Run gunicorn
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8080"]
```

### 6. **Соціальна аутентифікація (опційно)**

Якщо використовуєте Google/Meta login:

```bash
pip install google-auth-oauthlib
```

### 7. **Інітіалізація GCP проекту**

```bash
# Створіть App Engine
gcloud app create

# Створіть Cloud SQL базу (PostgreSQL рекомендована)
gcloud sql instances create maxiclean-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1

# Створіть базу даних
gcloud sql databases create maxiclean --instance=maxiclean-db

# Встановіть пароль користувача
gcloud sql users set-password postgres \
  --instance=maxiclean-db \
  --password=YOUR_SECURE_PASSWORD
```

### 8. **Налаштування Environment змінних**

Створіть файл `backend/.env.gcp`:

```
DEBUG=False
SECRET_KEY=your-very-long-random-secret-key-here
ALLOWED_HOSTS=maxiclean.time,www.maxiclean.time
DB_NAME=maxiclean
DB_USER=postgres
DB_PASSWORD=YOUR_SECURE_PASSWORD
DB_HOST=/cloudsql/PROJECT_ID:us-central1:maxiclean-db
CORS_ALLOWED_ORIGINS=https://maxiclean.time,https://www.maxiclean.time
CSRF_TRUSTED_ORIGINS=https://maxiclean.time,https://www.maxiclean.time
```

Додайте у `app.yaml`:

```yaml
env_variables:
  DEBUG: "False"
  SECRET_KEY: "your-secret-key"
  DB_NAME: "maxiclean"
  DB_USER: "postgres"
  DB_PASSWORD: "YOUR_SECURE_PASSWORD"
  DB_HOST: "/cloudsql/PROJECT_ID:us-central1:maxiclean-db"
```

### 9. **Deploy на GCP**

```bash
# Перейдіть у папку backend
cd backend

# Запустіть deploy
gcloud app deploy

# Міграції
gcloud app exec -- python manage.py migrate
```

### 10. **Розгортання Frontend**

Варіант A: **Cloud Storage + Cloud CDN** (рекомендується)

```bash
# Перейдіть у папку frontend
cd frontend

# Зберіть
npm run build

# Завантажте на Cloud Storage
gsutil -m cp -r dist/* gs://maxiclean-frontend/

# Налаштуйте CORS
gsutil cors set cors-config.json gs://maxiclean-frontend
```

Файл `frontend/cors-config.json`:

```json
[
  {
    "origin": ["https://maxiclean.time", "https://www.maxiclean.time"],
    "method": ["GET", "HEAD"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
```

Варіант B: **Cloud Run** (більше гнучкості)

```bash
# Зберіть Docker image
docker build -t gcr.io/PROJECT_ID/maxiclean-frontend:latest .

# Завантажте на Container Registry
docker push gcr.io/PROJECT_ID/maxiclean-frontend:latest

# Deploy на Cloud Run
gcloud run deploy maxiclean-frontend \
  --image gcr.io/PROJECT_ID/maxiclean-frontend:latest \
  --platform managed \
  --region us-central1
```

### 11. **Налаштування вашого домена**

1. Переконайтеся, що домен `maxiclean.time` управляється у GCP Cloud Domains або інших реєстрарах
2. Додайте DNS A records у консолі GCP:

```
Name: maxiclean.time
Type: A
TTL: 3600
Data: [GCP App Engine IP - дивіться у консолі]

Name: www.maxiclean.time
Type: CNAME
TTL: 3600
Data: maxiclean.time
```

3. Налаштуйте SSL сертифікат:

```bash
gcloud compute ssl-certificates create maxiclean-cert \
  --domains maxiclean.time,www.maxiclean.time
```

### 12. **Перевірка та тестування**

```bash
# Перевірте статус App Engine
gcloud app describe

# Переглядайте логи
gcloud app logs read --limit 50

# Тестуйте
curl https://maxiclean.time/api/v1/callbacks/
```

## 💰 Вартість на GCP

- **App Engine**: ~$20-40/місяць (зі слайдом масштабування)
- **Cloud SQL (db-f1-micro)**: ~$8-15/місяць
- **Cloud Storage**: $0.02 за GB/місяць
- **Outbound traffic**: $0.12 за GB (перші 1 GB вільні)
- **Total**: ~$30-60/місяць

## 🎯 Важливо

1. Встановіть змінну `SECRET_KEY` в app.yaml
2. Включіть HTTPS для вашого домена
3. Налаштуйте резервне копіювання бази даних
4. Моніторьте логи та помилки на GCP консолі

---

**Питання?** Дивіться: https://cloud.google.com/docs/deploy
