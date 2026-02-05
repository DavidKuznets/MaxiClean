from django.db import models
from django.core.files.storage import FileSystemStorage
from django.utils import timezone

from config import settings

from .utils import send_telegram_message


## model Occupation
class StatusOccupation(models.TextChoices):
    NEW = "NEW", "Нове"
    APPROVED = "APPROVED", "Схвалено"
    REJECTED = "REJECTED", "Відхилено"


class Occupation(models.Model):
    name = models.CharField(max_length=65, unique=True, verbose_name = "Назва")
    status = models.CharField(
        max_length=10, choices=StatusOccupation, default=StatusOccupation.NEW, verbose_name = "Статус"
    )

    ## Occupation.objects.filter(status=StatusOccupation.NEW)  for searching
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Вид діяльності"
        verbose_name_plural = "Види діяльності клієнтів"
        ordering = ("name",)


## IMAGES
import os

def image_file_path(instance, filename, catalog):
    _, extension = os.path.splitext(filename)
    return os.path.join(catalog, f"{instance.pk}{extension}")


def service_image_path(instance, filename):
    return image_file_path(instance, filename, "services")


def work_image_path(instance, filename):
    return image_file_path(instance, filename, "works")


def staff_photo_path(instance, filename):
    return image_file_path(instance, filename, "staff")


def client_photo_path(instance, filename):
    return image_file_path(instance, filename, "clients")


def callback_photo_path(instance, filename):
    return image_file_path(instance, filename, "callbacks")


class OverwriteStorage(FileSystemStorage):
    """
    Клас сховища, який дозволяє перезапис.
    Якщо фото-файл існує: видаляємо його, оновлюємо фото
    """
    def get_available_name(self, name, max_length=None):
        if self.exists(name):
            self.delete(name)
        return name
## end IMAGES


## model Service - це категорії послуг, що надаються
class ServiceCategory(models.Model):
    """
    ServiceCategory: це категорії послуг, що надаються
    """
    name = models.CharField(
        max_length=200, unique=True,
        verbose_name = "Назва категорії послуги"
    )
    description = models.CharField(
        max_length=400, null=True, blank=True,
        verbose_name = "Короткий опис (може бути порожнім)"
    )
    service_image = models.ImageField(
        upload_to=service_image_path,
        verbose_name = "Додайте зображення (дозволені формати файлу: .jpg, .png)",
        storage=OverwriteStorage(),
    )
    is_active = models.BooleanField(default=True,  verbose_name = "Увімкнено")

    def save(self, *args, **kwargs):
        """
        Перевизначення self.save(): Спочатку зберігаємо об’єкт ServiceCategory без файлу, щоб отримати pk.
        Потім додаємо файл і зберігаємо вдруге (щоб зробити: 1.png, 2.jpg і т.д. де 1,2,.. це ID)
        """
        if not self.pk and self.service_image:
            image = self.service_image
            self.service_image = None
            super().save(*args, **kwargs)

            self.service_image = image
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Вид послуги"
        verbose_name_plural = "Види послуг"
        ordering = ("name",)


## model Work - це роботи, що виконуються у кожній категорії
class ServiceWork(models.Model):
    """
    ServiceWork: це роботи, що виконуються у кожній категорії
    """
    name = models.CharField(
        max_length=255, unique=True,
        verbose_name = "Назва роботи"
    )
    description = models.CharField(
        max_length=400, null=True, blank=True,
        verbose_name = "Короткий опис роботи (може бути порожнім)"
    )
    service_category = models.ForeignKey(
        ServiceCategory,
        ## не можна видалити категорію, якщо є хоча б одна робота в цій категорії
        on_delete=models.PROTECT,
        related_name="works",
        verbose_name = "Вид послуги"
    )
    price = models.DecimalField(
        max_digits=10, decimal_places=2,
        verbose_name = "Мінімальна ціна"
    )
    discount = models.IntegerField(default=0, verbose_name = "Знижка")
    work_image = models.ImageField(
        upload_to=work_image_path,
        verbose_name = "Додайте зображення (дозволені формати файлу: .jpg, .png)",
        storage=OverwriteStorage(),
    )
    is_active = models.BooleanField(default=True, verbose_name = "Увімкнено")

    def save(self, *args, **kwargs):
        """
        Перевизначення self.save(): Спочатку зберігаємо об’єкт ServiceWork без файлу, щоб отримати pk.
        Потім додаємо файл і зберігаємо вдруге (щоб зробити_ 1.png, 2.jpg і т.д. де 1,2,.. це ID)
        """
        if not self.pk and self.work_image:
            image = self.work_image
            self.work_image = None
            super().save(*args, **kwargs)

            self.work_image = image
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Вид роботи"
        verbose_name_plural = "Види робіт"
        ordering = ("name", )


## model CallbackRequest
class StatusCallbackRequest(models.TextChoices):
    NEW = "NEW", "Нове"
    PROCESSED = "PROCESSED", "Оброблено"
    FAILED = "FAILED", "Невдало"


class CallbackRequest(models.Model):
    full_name = models.CharField(
        max_length=100,
        verbose_name="Ім’я та прізвище"
    )
    phone_number = models.CharField(
        max_length=20,
        verbose_name="Телефон"
    )
    addition = models.CharField(
        max_length=60,
        verbose_name="Додатковий контакт (за бажанням)",
        null=True,
        blank=True,
    )
    photo = models.ImageField(
        upload_to=callback_photo_path,
        verbose_name="Додайте фото (.jpg, .png)",
        storage=OverwriteStorage(),
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата запиту"
    )
    status = models.CharField(
        max_length=10, choices=StatusCallbackRequest, default=StatusCallbackRequest.NEW, verbose_name = "Статус запиту"
    )
    ## 3аповнює працівник компанії після розмови
    service_interest = models.ForeignKey(
        ServiceCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Цікавить послуга"
    )
    ## 3аповнює працівник компанії після розмови / або якщо вона не здійснилася: чому?
    comment = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name="Коментар / уточнення"
    )

    def __str__(self):
        return f"{self.full_name} ({self.phone_number})"

    def save(self, *args, notify=True, **kwargs):
        """
        Перевизначення self.save(): Спочатку зберігаємо об’єкт CallbackRequest без файлу, щоб отримати pk.
        Потім додаємо файл і зберігаємо вдруге (щоб зробити: 1.png, 2.jpg і т.д. де 1,2,.. це ID)
        """
        text = ("<b>**MaxiClean** Новий запит на дзвінок</b>: "
                f"від {self.full_name}, "
                f"телефон {self.phone_number} ")  # for Telegram
        if self.addition:
            text += f"додатковий контакт {self.addition} "
        if not self.pk and self.photo:
            image = self.photo
            self.photo = None
            super().save(*args, **kwargs)  # створюємо запис, отримуємо pk
            self.photo = image
            super().save(update_fields=["photo"])  # оновлюємо тільки photo
            text += " <i>(фото збережено у базі)</i>"
        else:
            super().save(*args, **kwargs)
        if notify:
            # Telegram-message
            send_telegram_message(text=text)

    class Meta:
        verbose_name = "Запит на дзвінок"
        verbose_name_plural = "Всі запити на дзвінок"
        ordering = ("-created_at", )


## model  Question
class Question(models.Model):
    """
    Question Це відображення на вебсайті питань у вигляді: Запитання - Відповідь
    """
    asked = models.CharField(max_length=150, verbose_name = "Питання")
    answer = models.TextField(verbose_name = "Відповідь")
    is_active = models.BooleanField(default=True, verbose_name = "Увімкнено")

    def __str__(self):
        return f"{self.asked[:30]}..? -> {self.answer[:50]}.."

    class Meta:
        verbose_name = "Питання-відповідь"
        verbose_name_plural = "Всі питання з відповідями"
        ordering = ("asked", )


## model  OurStaff
class OurStaff(models.Model):
    """
    OurStaff - Це люди, які працюють у нашій команді.
    Загальний досвід, який буде відображено на вебсайті,
    розраховується на основі попереднього досвіду + досвід з моменту працевлаштування в компанію.
    """
    full_name = models.CharField(
        max_length = 100,
        verbose_name = "Ім’я та прізвище"
    )
    responsibility = models.CharField(
        max_length = 150,
        verbose_name = "Роль у команді"
    )
    ## Попередній досвід, скільки має років досвіду до працевлаштування у MaxiClean
    prev_experience = models.PositiveIntegerField(
        default=0,
        verbose_name="Пре-досвід"
    )
    photo = models.ImageField(
        upload_to = staff_photo_path,
        verbose_name = "Додайте фото (дозволені формати файлу: .jpg, .png)",
        storage = OverwriteStorage(),
    )
    hired_at = models.DateField(
        default = timezone.now,
        verbose_name = "Дата працевлаштування"
    )
    is_active = models.BooleanField(default=True, verbose_name="Увімкнено")

    def save(self, *args, **kwargs):
        """
        Перевизначення self.save(): Спочатку зберігаємо об’єкт OurStaff без файлу, щоб отримати pk.
        Потім додаємо файл і зберігаємо вдруге (щоб зробити_ 1.png, 2.jpg і т.д. де 1,2,.. це ID)
        """
        if not self.pk and self.photo:
            image = self.photo
            self.photo = None
            super().save(*args, **kwargs)

            self.photo = image
        super().save(*args, **kwargs)

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = "Працівник"
        verbose_name_plural = "Наша команда"
        ordering = ("full_name", )


## model  Review
class Gender(models.TextChoices):
    MALE = "MALE", "Чоловік"
    FEMALE = "FEMALE", "Жінка"
    UNSPEC = "UNSPEC", "Невизначено"


class Rating(models.TextChoices):
    ONE = "1", "1"
    TWO = "2", "2"
    THREE = "3", "3"
    FOUR = "4", "4"
    FIVE = "5", "5"  ## abo "⭐️⭐️⭐️⭐️⭐️"


class StatusReview(models.TextChoices):
    NEW = "NEW", "Новий"
    APPROVED = "APPROVED", "Схвалений"
    REJECTED = "REJECTED", "Відхилений"


class Review(models.Model):
    """
    Review - "Відгуки кліентів": це відгуки людей, які вже скористалися нашими послугами.
    """
    service = models.ForeignKey(
        ServiceCategory,
        on_delete=models.PROTECT,
        related_name="reviews",
        verbose_name="Вид послуги"
    )
    full_name = models.CharField(
        max_length=100,
        verbose_name="Ім’я та прізвище"
    )
    gender = models.CharField(
        max_length=12, choices=Gender, default=Gender.UNSPEC, verbose_name="Стать"
    )
    occupation = models.ForeignKey(
        Occupation,
        on_delete=models.PROTECT,
        verbose_name="Вид діяльності"
    )
    avatar = models.ImageField(
        upload_to=client_photo_path,
        verbose_name="Додайте фото (дозволені формати файлу: .jpg, .png)",
        storage=OverwriteStorage(),
        null=True,
        blank=True,
    )
    rating = models.CharField(
        max_length=1, choices=Rating, default=Rating.FIVE, verbose_name="Ваша оцінка сервісу"
    )
    content = models.TextField(max_length=500, verbose_name="Додайте коментар")
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата відгуку"
    )
    status = models.CharField(
        max_length=10, choices=StatusReview, default=StatusReview.NEW, verbose_name="Статус відгуку"
    )

    def __str__(self):
        return f"{self.full_name}: {self.rating}"

    class Meta:
        verbose_name = "Відгук"
        verbose_name_plural = "_Відгуки кліентів"
        ordering = ("-created_at",)

    def save(self, *args, notify=True, **kwargs):
        """
        Перевизначення self.save(): Спочатку зберігаємо об’єкт Review без файлу, щоб отримати pk.
        Потім додаємо файл і зберігаємо вдруге (щоб зробити: 1.png, 2.jpg і т.д. де 1,2,.. це ID)
        """
        if not self.pk and self.avatar:
            image = self.avatar
            self.avatar = None
            super().save(*args, **kwargs)  # створюємо запис, отримуємо pk
            self.avatar = image
            super().save(update_fields=["avatar"])  # оновлюємо тільки аватар
        else:
            super().save(*args, **kwargs)
        if notify:
            # Telegram message
            text = (f"<b>**MaxiClean** Новий відгук:</b> <code>{self.content}</code> "
                    f" Від: {self.full_name} * Оцінка: <b>{self.rating}</b> "
                    f"* <i>змініть статус у базі, "
                    f"щоб відгук було опубліковано на сторінці</i>")
            send_telegram_message(text=text)
