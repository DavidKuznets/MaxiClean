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
		"addition_display",
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

	def save_model(self, request, obj, form, change):
		# тут ми явно вимикаємо notify
		obj.save(notify=False)

	def addition_display(self, obj):
		if obj.addition:
			return obj.addition
		return "-/-"  #
	addition_display.short_description = "Інший контакт"

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
	readonly_fields = ("avatar_display_large", "formatted_created_date_readonly")
	fieldsets = (
		("Інформація про клієнта", {
			"fields": ("full_name", "gender", "occupation", "avatar", "avatar_display_large")
		}),
		("Відгук", {
			"fields": ("service", "rating", "content", "status", "formatted_created_date_readonly")
		}),
	)

	def save_model(self, request, obj, form, change):
		# тут ми явно вимикаємо notify
		obj.save(notify=False)

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

	## Велике відображення фото в формі редагування
	def avatar_display_large(self, obj):
		if obj.avatar:
			return format_html(
				'<img src="{}" width="150" height="150" style="border-radius: 8px; object-fit: cover;" />',
				obj.avatar.url
			)
		return "Фото не завантажено"
	avatar_display_large.short_description = "Поточне фото"

	## Readonly дата для форми
	def formatted_created_date_readonly(self, obj):
		return timezone.localtime(obj.created_at).strftime("%d-%m-%y, %H:%M")
	formatted_created_date_readonly.short_description = "Дата створення"

	## 3аголовок у таблиці photo
	def client_avatar_display(self, obj):
		if obj.avatar:
			return format_html(
				'<a href="{}" target="_blank"><img src="{}" width="40" height="40" style="border-radius: 4px; object-fit: cover;" /></a>',
				obj.avatar.url, obj.avatar.url
			)
		return "-"  # посилання на Зображення
	client_avatar_display.short_description = "Фото"
