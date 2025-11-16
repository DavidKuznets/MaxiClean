import os

from django.db import models
from django.core.files.storage import FileSystemStorage

from config import settings


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
        verbose_name_plural = "Види діяльності кліентів"
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


## model Service - це  категорії послуг, що надаються
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
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        """
        Перевизначення self.save(): Спочатку зберігаємо об’єкт ServiceCategory без файлу, щоб отримати pk.
        Потім додаємо файл і зберігаємо вдруге (щоб зробитиб 1.png, 2.jpg і т.д. де 1,2,.. це ID)
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
        related_name="works"
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.IntegerField(default=0)
    work_image = models.ImageField(
        upload_to=work_image_path,
        verbose_name = "Додайте зображення (дозволені формати файлу: .jpg, .png)",
        storage=OverwriteStorage(),
    )
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        """
        Перевизначення self.save(): Спочатку зберігаємо об’єкт ServiceWork без файлу, щоб отримати pk.
        Потім додаємо файл і зберігаємо вдруге (щоб зробитиб 1.png, 2.jpg і т.д. де 1,2,.. це ID)
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
        ordering = ("service_category", "name")
