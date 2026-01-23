from rest_framework import viewsets, mixins

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
    queryset = CallbackRequest.objects.all()
    serializer_class = CallbackRequestSerializer
