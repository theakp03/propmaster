from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.full_name', read_only=True)
    unit_label = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = [
            'uuid', 'lease', 'amount', 'date_paid', 'transaction_id',
            'payment_type', 'payment_status', 'notes',
            'tenant_name', 'unit_label', 'created_at', 'updated_at',
        ]
        read_only_fields = ['uuid', 'created_at', 'updated_at']

    def get_unit_label(self, obj):
        return str(obj.lease.unit)