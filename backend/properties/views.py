from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum

from .models import Property, Unit
from .serializers import (
    PropertySerializer,
    PropertyListSerializer,
    UnitSerializer,
)
from accounts.permissions import IsLandlord, IsLandlordOrTenantReadOnly


class PropertyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsLandlord]
    lookup_field = 'uuid'

    def get_serializer_class(self):
        if self.action == 'list':
            return PropertyListSerializer
        return PropertySerializer

    def get_queryset(self):
        return (
            Property.objects
            .filter(owner=self.request.user)
            .select_related('owner')
            .prefetch_related('units')
        )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=['get'])
    def dashboard_stats(self, request):
        properties = self.get_queryset()
        units = Unit.objects.filter(building__owner=request.user)

        total_units = units.count()
        occupied_units = units.filter(is_occupied=True).count()
        occupancy_rate = (
            round((occupied_units / total_units) * 100, 1)
            if total_units > 0 else 0.0
        )

        from payments.models import Payment
        from django.utils import timezone

        current_month = timezone.now().month
        current_year = timezone.now().year

        total_income = (
            Payment.objects
            .filter(
                lease__unit__building__owner=request.user,
                payment_status='COMPLETED',
                date_paid__month=current_month,
                date_paid__year=current_year,
            )
            .aggregate(total=Sum('amount'))['total']
            or 0
        )

        total_income_all_time = (
            Payment.objects
            .filter(
                lease__unit__building__owner=request.user,
                payment_status='COMPLETED',
            )
            .aggregate(total=Sum('amount'))['total']
            or 0
        )

        from maintenance.models import MaintenanceRequest
        open_requests = (
            MaintenanceRequest.objects
            .filter(
                unit__building__owner=request.user,
                status__in=['NEW', 'IN_PROGRESS'],
            )
            .count()
        )

        return Response({
            'total_properties': properties.count(),
            'total_units': total_units,
            'occupied_units': occupied_units,
            'vacant_units': total_units - occupied_units,
            'occupancy_rate': occupancy_rate,
            'total_income_this_month': str(total_income),
            'total_income_all_time': str(total_income_all_time),
            'open_maintenance_requests': open_requests,
        })


class UnitViewSet(viewsets.ModelViewSet):
    serializer_class = UnitSerializer
    permission_classes = [IsAuthenticated, IsLandlordOrTenantReadOnly]
    lookup_field = 'uuid'

    def get_queryset(self):
        user = self.request.user

        if user.role == 'LANDLORD':
            queryset = (
                Unit.objects
                .filter(building__owner=user)
                .select_related('building', 'building__owner')
            )
        elif user.role == 'TENANT':
            queryset = (
                Unit.objects
                .filter(
                    leases__tenant=user,
                    leases__is_active=True,
                )
                .select_related('building')
                .distinct()
            )
        else:
            queryset = Unit.objects.none()

        property_uuid = self.request.query_params.get('property')
        if property_uuid:
            queryset = queryset.filter(building__uuid=property_uuid)

        return queryset