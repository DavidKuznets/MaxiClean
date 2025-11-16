from django.contrib import admin

from django.utils.html import format_html

from .models import Occupation, ServiceCategory, ServiceWork


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
