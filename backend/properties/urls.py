from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, UnitViewSet

router = DefaultRouter()
router.register(r'units', UnitViewSet, basename='unit')
router.register(r'', PropertyViewSet, basename='property')

app_name = 'properties'

urlpatterns = [
    path('', include(router.urls)),
]
