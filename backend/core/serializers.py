from datetime import date
from math import ceil
from symtable import Function

from rest_framework import serializers

from .models import Review, ServiceCategory, Occupation, ServiceWork, Question, OurStaff, CallbackRequest


class ServiceCategoryBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = (
            "id",
            "name",
        )


class ServiceCategoryListSerializer(ServiceCategoryBaseSerializer):
    class Meta:
        model = ServiceCategory
        fields = ServiceCategoryBaseSerializer.Meta.fields + (
            "description",
            "service_image",
        )


class OccupationBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupation
        fields = (
            "id",
            "name",
        )


class ReviewBaseSerializer(serializers.ModelSerializer):
    service = ServiceCategoryBaseSerializer(read_only=True)
    occupation = OccupationBaseSerializer(read_only=True)

    class Meta:
        model = Review
        fields = (
            "id",
            "service",
            "full_name",
            "gender",
            "occupation",
            "avatar",
            "rating",
			"content",
			"created_at",
			"status"
        )


class ReviewCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = (
            "service",
            "full_name",
            "gender",
            "occupation",
            "avatar",
            "rating",
			"content"
        )


class ReviewSerializer(ReviewBaseSerializer):
    pass


class ServiceWorkListSerializer(serializers.ModelSerializer):
    service_category = ServiceCategoryBaseSerializer(read_only=True)

    class Meta:
        model = ServiceWork
        fields = (
            "id",
            "name",
            "description",
            "service_category",
            "price",
            "discount",
            "work_image",
            "is_active"
        )


class QuestionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = (
            "id",
            "asked",
            "answer",
            "is_active"
        )


class OurStaffSerializer(serializers.ModelSerializer):
    experience = serializers.SerializerMethodField()

    class Meta:
        model = OurStaff
        fields = (
            "id",
            "full_name",
            "responsibility",
            "experience",
            "photo",
            "prev_experience",
            "hired_at",
            "is_active"
        )

    def get_experience(self, obj):
        today = date.today()
        delta_days = (today - obj.hired_at).days
        # переводимо у роки (365 днів ~ 1 рік) і округлюємо вгору
        years = ceil(delta_days / 365)
        return years + obj.prev_experience


class CallbackRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallbackRequest
        fields = (
            "full_name",
            "phone_number"
        )
