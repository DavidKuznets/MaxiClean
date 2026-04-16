# ✅ Pre-Deployment Checklist

> Виконайте перед дея deploy на GCP

## 📋 Backend підготовка

- [ ] Встановіть `gunicorn` в requirements.txt:

  ```bash
  echo "gunicorn==21.2.0" >> backend/requirements.txt
  ```

- [ ] Встановіть `whitenoise` для static файлів:

  ```bash
  echo "whitenoise==6.4.0" >> backend/requirements.txt
  ```

- [ ] Оновіть `backend/config/settings.py`:
  - [ ] Додайте `STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')`
  - [ ] Додайте `STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'`
  - [ ] Додайте поле `DEBUG = config('DEBUG', default=False, cast=bool)`
  - [ ] Встановіть `CSRF_COOKIE_SECURE = True`
  - [ ] Встановіть `SESSION_COOKIE_SECURE = True`

- [ ] Зберіть статичні файли:

  ```bash
  cd backend
  python manage.py collectstatic --noinput
  cd ..
  ```

- [ ] Перевірте міграції:

  ```bash
  cd backend
  python manage.py migrate
  cd ..
  ```

- [ ] Тестуйте локально:
  ```bash
  cd backend
  gunicorn config.wsgi:application
  ```

## 🎨 Frontend підготовка

- [ ] Створіть `.env.production` в папці `frontend`:

  ```
  VITE_API_BASE_URL=https://maxiclean.time/api/v1
  ```

- [ ] Збудуйте frontend:

  ```bash
  cd frontend
  npm run build
  cd ..
  ```

- [ ] Перевірте що `dist` папка створена без помилок

- [ ] Перевірте розміри файлів (мають бути < 5MB):
  ```bash
  du -sh frontend/dist
  ```

## 🐳 Docker підготовка

- [ ] Перевірте `backend/Dockerfile`:

  ```dockerfile
  FROM python:3.9-slim
  WORKDIR /app
  COPY backend/requirements.txt ./
  RUN pip install --no-cache-dir -r requirements.txt
  COPY backend/ .
  EXPOSE 8080
  CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8080"]
  ```

- [ ] Протестуйте Docker локально:
  ```bash
  docker build -t maxiclean-backend:latest -f backend/Dockerfile .
  docker run -p 8000:8080 maxiclean-backend:latest
  ```

## ☁️ GCP підготовка

- [ ] Google Cloud SDK встановлений:

  ```bash
  gcloud --version
  ```

- [ ] Авторизовані в GCP:

  ```bash
  gcloud auth login
  ```

- [ ] GCP проект вибраний:

  ```bash
  gcloud config get-value project
  ```

- [ ] APIs активовані:

  ```bash
  gcloud services enable appengine sqladmin storage-api
  ```

- [ ] Cloud SQL інстанс створений:

  ```bash
  gcloud sql instances list
  ```

- [ ] Cloud Storage bucket створений:
  ```bash
  gsutil ls gs://maxiclean-frontend
  ```

## 🔐 Безпека

- [ ] SECRET_KEY в `app.yaml` унікальний та складний (мін. 50 символів)

- [ ] DEBUG=False в production

- [ ] ALLOWED_HOSTS містить ваш домен:

  ```
  maxiclean.time,www.maxiclean.time
  ```

- [ ] CSRF_TRUSTED_ORIGINS містить ваш домен:

  ```
  https://maxiclean.time,https://www.maxiclean.time
  ```

- [ ] CORS_ALLOWED_ORIGINS налаштований:

  ```
  https://maxiclean.time,https://www.maxiclean.time
  ```

- [ ] Переконайтеся що `.env` файли у `.gitignore`:

  ```bash
  grep ".env" .gitignore
  ```

- [ ] Немає чутливої інформації у коді (паролі, токени тощо)

## 📝 Конфігурація файлів

- [ ] `backend/app.yaml` існує та налаштований
- [ ] `backend/requirements.txt` актуальний
- [ ] `frontend/.env.production` створений
- [ ] `deploy.sh` (Mac/Linux) є і виконуваний
- [ ] `deploy.bat` (Windows) є

## 🌐 Домен

- [ ] Домен `maxiclean.time` активний і оплачений
- [ ] Домен управляється у GCP Cloud Domains або інших реєстраторів
- [ ] Готові до налаштування DNS записів

## ✨ Фінальна перевірка

- [ ] Тестова сторінка відкривається локально без помилок
- [ ] Форми подають дані без помилок
- [ ] CORS помилки відсутні в console
- [ ] Static файли завантажуються коректно
- [ ] Нема 404 помилок на медіа файлах

---

## 🚀 Готово до запуску?

```bash
# Windows
./deploy.bat

# Mac/Linux
bash deploy.sh
```

---

## 📞 Якщо кращо йде не так

1. Дивіться логи:

   ```bash
   gcloud app logs read --limit 100
   ```

2. Перевірте статус:

   ```bash
   gcloud app describe
   ```

3. Перезапустіть сервіс:

   ```bash
   gcloud app services set-traffic default --splits latest=100
   ```

4. Знаходитеся в документації:
   - https://cloud.google.com/appengine/docs/standard/python-runtime/quickstart
   - https://cloud.google.com/appengine/docs/standard/python-runtime/django-tips
