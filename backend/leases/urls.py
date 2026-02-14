from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeaseViewSet

router = DefaultRouter()
router.register(r'', LeaseViewSet, basename='lease')

app_name = 'leases'

urlpatterns = [
    path('', include(router.urls)),
]
