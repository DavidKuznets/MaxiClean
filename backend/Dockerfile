# Використовуємо офіційний Python образ
FROM python:3.11-slim

# Встановлюємо робочу директорію
WORKDIR /app

# Встановлюємо системні залежності
RUN apt-get update && apt-get install -y \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/*

# Копіюємо requirements і ставимо залежності
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копіюємо весь проект
COPY . .

# Задаємо змінні середовища
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Зберігаємо статичні файли
RUN mkdir -p /app/staticfiles /app/media

# Команда запуску (через Gunicorn для production)
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]
