from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny

from .models import (
    Review,
    StatusReview,
    ServiceCategory,
    Occupation,
    StatusOccupation,
)
from .serializers import (
    ReviewSerializer,
    ReviewCreateSerializer,
    ServiceCategoryListSerializer,
    OccupationBaseSerializer,
)


class ReviewViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet
):
    """
    GET  /api/v1/reviews/   — публічний список відгуків
    POST /api/v1/reviews/   — публічне створення відгуку
    """
    queryset = Review.objects.filter(status=StatusReview.APPROVED)
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == "create":
            return ReviewCreateSerializer
        return ReviewSerializer


class ServiceCategoryViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """
    GET /api/v1/services/ — публічний список категорій
    """
    queryset = ServiceCategory.objects.filter(is_active=True)
    serializer_class = ServiceCategoryListSerializer
    permission_classes = [AllowAny]


class OccupationViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """
    GET /api/v1/occupations/ — публічний список видів діяльності
    """
    queryset = Occupation.objects.filter(status=StatusOccupation.APPROVED)
    serializer_class = OccupationBaseSerializer
    permission_classes = [AllowAny]
