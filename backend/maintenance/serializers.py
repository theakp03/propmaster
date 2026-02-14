from rest_framework import serializers
from .models import MaintenanceRequest
from accounts.serializers import UserMinimalSerializer


class MaintenanceRequestSerializer(serializers.ModelSerializer):
    tenant_detail = UserMinimalSerializer(source='tenant', read_only=True)
    landlord = UserMinimalSerializer(read_only=True)
    unit_label = serializers.SerializerMethodField()

    class Meta:
        model = MaintenanceRequest
        fields = [
            'uuid', 'unit', 'tenant', 'tenant_detail', 'landlord',
            'unit_label', 'title', 'description', 'photo',
            'status', 'priority', 'landlord_notes', 'resolved_at',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['uuid', 'tenant', 'resolved_at', 'created_at', 'updated_at']

    def get_unit_label(self, obj):
        return str(obj.unit)

    def create(self, validated_data):
        request = self.context['request']
        validated_data['tenant'] = request.user

        unit = validated_data.get('unit')
        active_lease = unit.leases.filter(
            tenant=request.user,
            is_active=True,
        ).exists()

        if not active_lease:
            raise serializers.ValidationError({
                'unit': 'You can only report issues for units where you have an active lease.'
            })

        return super().create(validated_data)