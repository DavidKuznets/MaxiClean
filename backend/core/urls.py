from django.urls import path, include
from rest_framework import routers

from .views import (
	ReviewViewSet,
	ServiceCategoryViewSet,
	OccupationViewSet,
	ServiceWorkViewSet,
	QuestionViewSet,
	OurStaffViewSet,
	CallbackRequestViewSet
)

router = routers.DefaultRouter()

router.register("reviews", ReviewViewSet)
router.register("services", ServiceCategoryViewSet)
router.register("occupations", OccupationViewSet)
router.register("works", ServiceWorkViewSet)
router.register("questions", QuestionViewSet)
router.register("staff", OurStaffViewSet)
router.register("callbacks", CallbackRequestViewSet)


urlpatterns = [
	path("", include(router.urls)),
]
