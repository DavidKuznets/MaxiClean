from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny

from .models import (
    Review,
    StatusReview,
    ServiceCategory,
    Occupation,
    StatusOccupation, ServiceWork, Question, OurStaff, CallbackRequest,
)
from .serializers import (
    ReviewSerializer,
    ReviewCreateSerializer,
    ServiceCategoryListSerializer,
    OccupationBaseSerializer, ServiceWorkListSerializer, QuestionListSerializer, OurStaffSerializer,
    CallbackRequestSerializer,
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



class ServiceWorkViewSet(
    mixins.ListModelMixin,
    # mixins.CreateModelMixin,
    # mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    queryset = ServiceWork.objects.filter(is_active=True)
    serializer_class = ServiceWorkListSerializer


class QuestionViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    queryset = Question.objects.filter(is_active=True)
    serializer_class = QuestionListSerializer


class OurStaffViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    queryset = OurStaff.objects.filter(is_active=True)
    serializer_class = OurStaffSerializer


class CallbackRequestViewSet(
    mixins.CreateModelMixin,
    viewsets.GenericViewSet
):
    """
    POST /api/v1/callbacks/ — створення запиту
    """
    queryset = CallbackRequest.objects.all()
    serializer_class = CallbackRequestSerializer
    permission_classes = [AllowAny]
