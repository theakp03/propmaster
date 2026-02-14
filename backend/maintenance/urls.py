from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MaintenanceRequestViewSet

router = DefaultRouter()
router.register(r'', MaintenanceRequestViewSet, basename='maintenance-request')

app_name = 'maintenance'

urlpatterns = [
    path('', include(router.urls)),
]
