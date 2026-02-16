import requests
import logging

from config.settings import BOT_TOKEN, CHAT_ID

logger = logging.getLogger(__name__)


def send_telegram_message(text):
    """
    Відправляє повідомлення до Telegram.
    Якщо BOT_TOKEN або CHAT_ID не встановлені, функція логує попередження і повертається без помилки.
    """
    # Перевіримо, чи встановлені обов'язкові параметри
    if not BOT_TOKEN or not CHAT_ID:
        logger.warning(
            "⚠️ Telegram відправка пропущена: BOT_TOKEN або CHAT_ID не встановлені в .env"
        )
        return False

    try:
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        payload = {"chat_id": CHAT_ID, "text": text, "parse_mode": "HTML"}
        response = requests.post(url, data=payload, timeout=5)
        response.raise_for_status()
        logger.info("✅ Telegram повідомлення успішно відправлено")
        return True
    except requests.exceptions.RequestException as e:
        logger.error(f"❌ Помилка при відправці Telegram повідомлення: {e}")
        return False
    except Exception as e:
        logger.error(f"❌ Невідома помилка при відправці Telegram: {e}")
        return False

