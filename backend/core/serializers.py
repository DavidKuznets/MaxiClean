from rest_framework import serializers

from .models import Review, ServiceCategory, Occupation


class ServiceCategoryReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = (
            "id",
            "name",
        )


class OccupationReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupation
        fields = (
            "id",
            "name",
        )


class ReviewBaseSerializer(serializers.ModelSerializer):
    service = ServiceCategoryReviewSerializer(read_only=True)
    occupation = OccupationReviewSerializer(read_only=True)

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
