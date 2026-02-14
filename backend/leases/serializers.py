from rest_framework import serializers
from .models import Lease
from accounts.serializers import UserMinimalSerializer
from properties.serializers import UnitSerializer


class LeaseSerializer(serializers.ModelSerializer):
    tenant_detail = UserMinimalSerializer(source='tenant', read_only=True)
    unit_detail = UnitSerializer(source='unit', read_only=True)
    landlord = UserMinimalSerializer(read_only=True)
    duration_months = serializers.ReadOnlyField()

    class Meta:
        model = Lease
        fields = [
            'uuid', 'unit', 'tenant', 'tenant_detail', 'unit_detail',
            'landlord', 'start_date', 'end_date', 'monthly_rent',
            'security_deposit', 'document', 'is_active', 'notes',
            'duration_months', 'created_at', 'updated_at',
        ]
        read_only_fields = ['uuid', 'created_at', 'updated_at']

    def validate(self, attrs):
        request = self.context.get('request')
        unit = attrs.get('unit')
        tenant = attrs.get('tenant')

        if request and unit and request.user.role == 'LANDLORD':
            if unit.building.owner != request.user:
                raise serializers.ValidationError({
                    'unit': 'You can only create leases for units in your own properties.'
                })

        if tenant and tenant.role != 'TENANT':
            raise serializers.ValidationError({
                'tenant': 'The selected user must have the TENANT role.'
            })

        return attrs


class LeaseListSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.full_name', read_only=True)
    unit_label = serializers.SerializerMethodField()

    class Meta:
        model = Lease
        fields = [
            'uuid', 'tenant_name', 'unit_label', 'start_date',
            'end_date', 'monthly_rent', 'is_active', 'created_at',
        ]

    def get_unit_label(self, obj):
        return str(obj.unit)