from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone

from .models import MaintenanceRequest
from .serializers import MaintenanceRequestSerializer


class MaintenanceRequestViewSet(viewsets.ModelViewSet):
    serializer_class = MaintenanceRequestSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'uuid'

    def get_queryset(self):
        user = self.request.user

        if user.role == 'LANDLORD':
            queryset = (
                MaintenanceRequest.objects
                .filter(unit__building__owner=user)
                .select_related('unit', 'unit__building', 'tenant')
            )
        elif user.role == 'TENANT':
            queryset = (
                MaintenanceRequest.objects
                .filter(tenant=user)
                .select_related('unit', 'unit__building')
            )
        else:
            queryset = MaintenanceRequest.objects.none()

        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        priority_filter = self.request.query_params.get('priority')
        if priority_filter:
            queryset = queryset.filter(priority=priority_filter)

        return queryset

    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.status == MaintenanceRequest.Status.COMPLETED and not instance.resolved_at:
            instance.resolved_at = timezone.now()
            instance.save(update_fields=['resolved_at'])