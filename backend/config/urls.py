from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)


def api_root(request):
    """Simple root endpoint so / doesn't return 404."""
    return JsonResponse({
        'name': 'PropMaster API',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': {
            'admin': '/admin/',
            'auth': {
                'login': '/api/auth/token/',
                'refresh': '/api/auth/token/refresh/',
                'blacklist': '/api/auth/token/blacklist/',
            },
            'accounts': {
                'register': '/api/accounts/register/',
                'profile': '/api/accounts/profile/',
                'logout': '/api/accounts/logout/',
            },
            'properties': '/api/properties/',
            'units': '/api/properties/units/',
            'leases': '/api/leases/',
            'maintenance': '/api/maintenance/',
            'payments': '/api/payments/',
        }
    })


urlpatterns = [
    # Root
    path('', api_root, name='api-root'),

    # Admin
    path('admin/', admin.site.urls),

    # JWT Auth
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),

    # App endpoints
    path('api/accounts/', include('accounts.urls')),
    path('api/properties/', include('properties.urls')),
    path('api/leases/', include('leases.urls')),
    path('api/maintenance/', include('maintenance.urls')),
    path('api/payments/', include('payments.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)