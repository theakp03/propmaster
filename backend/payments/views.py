from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Payment
from .serializers import PaymentSerializer
from accounts.permissions import IsLandlordOrTenantReadOnly


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated, IsLandlordOrTenantReadOnly]
    lookup_field = 'uuid'

    def get_queryset(self):
        user = self.request.user

        if user.role == 'LANDLORD':
            return (
                Payment.objects
                .filter(lease__unit__building__owner=user)
                .select_related('lease', 'lease__unit', 'lease__tenant')
            )
        elif user.role == 'TENANT':
            return (
                Payment.objects
                .filter(lease__tenant=user)
                .select_related('lease', 'lease__unit')
            )
        return Payment.objects.none()