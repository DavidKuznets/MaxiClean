from django import forms
from django.contrib import admin

from django.utils import timezone
from django.utils.html import format_html

from .models import (
	Occupation,
	ServiceCategory,
	ServiceWork,
	CallbackRequest, Question, OurStaff, Review,
)


## admin.site.register(Occupation)
@admin.register(Occupation)
class OccupationAdmin(admin.ModelAdmin):
	list_display = ("id", "name", "status", )
	list_filter = ("status", )
	search_fields = ("name", )
	list_editable = ("status", )
	list_display_links = ("name", )

	## виключаємо вбудовану дію delete_selected
	actions = None

	## 3абороняємо видалення
	def has_delete_permission(self, request, obj=None):
		return False


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
	list_display = ("id", "name", "is_active", "service_image_display")
	list_filter = ("is_active", )
	search_fields = ("name", )
	list_editable = ("is_active", )
	list_display_links = ("name", )
	## виключаємо вбудовану дію delete_selected
	actions = None

	## 3абороняємо видалення
	def has_delete_permission(self, request, obj=None):
		return False

	## 3аголовок у таблиці
	def service_image_display(self, obj):
		if obj.service_image:
			return format_html('<a href="{}" target="_blank">{}</a>', obj.service_image.url, "Переглянути")
		return "-"  # посилання на Зображення
	service_image_display.short_description = "Зображення"


@admin.register(ServiceWork)
class ServiceWorkAdmin(admin.ModelAdmin):
	list_display = (
		"id",
		"name",
		"service_category",
		"price",
		"discount",
		"is_active",
		"work_image_display")
	list_filter = ("is_active", "service_category",)
	search_fields = ("name", )
	list_editable = ("price", "discount", "is_active", )
	list_display_links = ("name", )

	## виключаємо вбудовану дію delete_selected
	actions = None

	## 3абороняємо видалення
	def has_delete_permission(self, request, obj=None):
		return False

	## 3аголовок у таблиці
	def work_image_display(self, obj):
		if obj.work_image:
			return format_html('<a href="{}" target="_blank">{}</a>', obj.work_image.url, "Переглянути")
		return "-"  # посилання на Зображення
	work_image_display.short_description = "Зображення"


@admin.register(CallbackRequest)
class CallbackRequestAdmin(admin.ModelAdmin):
	list_display = (
		"id",
		"full_name",
		"phone_number",
		"formatted_created_date",
		"status",
		"service_interest",
		"comment",
		"photo_display"
	)
	list_filter = ("status", )
	search_fields = ("full_name", "phone_number", )
	list_editable = ("status", "service_interest", "comment", )
	list_display_links = ("full_name", )

	## відображення дати створення запиту у зручному форматі
	def formatted_created_date(self, obj):
		return timezone.localtime(obj.created_at).strftime("%d-%m-%y, %H:%M")
	formatted_created_date.short_description = "Дата запиту"

	## прибираємо іконки «плюс» (додати), «олівець» (змінити), «хрестик» (видалити) для ForeignKey field.
	autocomplete_fields = ("service_interest", )
	raw_id_fields = ("service_interest", )

	## виключаємо вбудовану дію delete_selected
	actions = None

	## 3абороняємо видалення
	def has_delete_permission(self, request, obj=None):
		return False

	## 3аголовок у таблиці photo
	def photo_display(self, obj):
		if obj.photo:
			return format_html('<a href="{}" target="_blank">{}</a>', obj.photo.url, "Фото")
		return "-"  # посилання на Зображення
	photo_display.short_description = "Фото"


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
	list_display = (
		"id",
		"asked",
		"answer",
		"is_active",
	)
	list_filter = ("is_active", )
	search_fields = ("asked", )
	list_editable = ("is_active", )
	list_display_links = ("asked", )

	## виключаємо вбудовану дію delete_selected
	actions = None

	## 3абороняємо видалення
	def has_delete_permission(self, request, obj=None):
		return False


@admin.register(OurStaff)
class OurStaffAdmin(admin.ModelAdmin):
	list_display = (
		"id",
		"full_name",
		"responsibility",
		"prev_experience",
		"short_hired_at",
		"is_active",
		"photo_display",
	)
	list_filter = ("is_active", )
	search_fields = ("full_name", "responsibility", )
	list_editable = ("is_active", )
	list_display_links = ("full_name", )

	## виключаємо вбудовану дію delete_selected
	actions = None

	## 3абороняємо видалення
	def has_delete_permission(self, request, obj=None):
		return False

	## 3аголовок у таблиці hired_at
	def short_hired_at(self, obj):
		return obj.hired_at.strftime("%Y-%m-%d")
	short_hired_at.short_description = "Прийнято"

	## 3аголовок у таблиці photo
	def photo_display(self, obj):
		if obj.photo:
			return format_html('<a href="{}" target="_blank">{}</a>', obj.photo.url, "Переглянути")
		return "-"  # посилання на Зображення
	photo_display.short_description = "Зображення"


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
	list_display = (
		"id",
		"service",
		"full_name",
		"gender",
		"occupation",
		"rating_display",
		"formatted_created_date",
		"status",
		"client_avatar_display"
	)
	list_filter = ("status",)
	search_fields = ("content", "full_name", )
	list_editable = ("status", )
	list_display_links = ("full_name", )

	## виключаємо вбудовану дію delete_selected
	actions = None

	## 3абороняємо видалення
	def has_delete_permission(self, request, obj=None):
		return False

	## відображення короткоі назви у таблиці
	def rating_display(self, obj):
		return obj.rating
	rating_display.short_description = "Оцінка"

	## відображення дати створення відгуку у зручному форматі
	def formatted_created_date(self, obj):
		return timezone.localtime(obj.created_at).strftime("%d-%m-%y, %H:%M")
	formatted_created_date.short_description = "Дата відгуку"

	## 3аголовок у таблиці photo
	def client_avatar_display(self, obj):
		if obj.avatar:
			return format_html('<a href="{}" target="_blank">{}</a>', obj.avatar.url, "Фото")
		return "-"  # посилання на Зображення
	client_avatar_display.short_description = "Фото"
