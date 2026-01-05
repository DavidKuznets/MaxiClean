from django.urls import path, include
from rest_framework import routers

from .views import ReviewViewSet, ServiceCategoryViewSet, OccupationViewSet


router = routers.DefaultRouter()

router.register("reviews", ReviewViewSet)
router.register("services", ServiceCategoryViewSet)
router.register("occupations", OccupationViewSet)

urlpatterns = [ path("", include(router.urls)), ]
