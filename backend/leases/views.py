from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Lease
from .serializers import LeaseSerializer, LeaseListSerializer
from accounts.permissions import IsLandlordOrTenantReadOnly


class LeaseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsLandlordOrTenantReadOnly]
    lookup_field = 'uuid'

    def get_serializer_class(self):
        if self.action == 'list':
            return LeaseListSerializer
        return LeaseSerializer

    def get_queryset(self):
        user = self.request.user

        if user.role == 'LANDLORD':
            return (
                Lease.objects
                .filter(unit__building__owner=user)
                .select_related('unit', 'unit__building', 'tenant')
            )
        elif user.role == 'TENANT':
            return (
                Lease.objects
                .filter(tenant=user)
                .select_related('unit', 'unit__building')
            )
        return Lease.objects.none()