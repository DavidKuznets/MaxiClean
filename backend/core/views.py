from django.db import models

from rest_framework import viewsets, mixins

from .models import Review, StatusReview, ServiceCategory, Occupation, StatusOccupation
from .serializers import (
    ReviewSerializer,
    ReviewCreateSerializer,
    ServiceCategoryListSerializer, OccupationBaseSerializer,
)


# class ServiceCategoryViewSet(
#     # mixins.ListModelMixin,
#     # mixins.CreateModelMixin,
#     # mixins.UpdateModelMixin,
#     mixins.RetrieveModelMixin,
#     viewsets.GenericViewSet
# ):
#     queryset = ServiceCategory.objects.filter(is_active=True)
#     serializer_class = ServiceCategoryReviewSerializer


class ReviewViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    # mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    queryset = Review.objects.filter(status=StatusReview.APPROVED)

    def get_serializer_class(self):
        if self.action == "create":
            return ReviewCreateSerializer
        return ReviewSerializer


class ServiceCategoryViewSet(
    mixins.ListModelMixin,
    # mixins.CreateModelMixin,
    # mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    queryset = ServiceCategory.objects.filter(is_active=True)
    serializer_class = ServiceCategoryListSerializer


class OccupationViewSet(
    mixins.ListModelMixin,
    # mixins.CreateModelMixin,
    # mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    queryset = Occupation.objects.filter(status=StatusOccupation.APPROVED)
    serializer_class = OccupationBaseSerializer
