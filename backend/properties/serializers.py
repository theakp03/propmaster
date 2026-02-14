from rest_framework import serializers
from .models import Property, Unit
from accounts.serializers import UserMinimalSerializer


class UnitSerializer(serializers.ModelSerializer):
    current_tenant = UserMinimalSerializer(read_only=True)
    property_name = serializers.CharField(source='building.name', read_only=True)
    property_uuid = serializers.CharField(source='building.uuid', read_only=True)

    class Meta:
        model = Unit
        fields = [
            'uuid', 'building', 'property_name', 'property_uuid', 'unit_number',
            'bedroom_count', 'bathroom_count', 'square_feet',
            'rent_price', 'is_occupied', 'description',
            'current_tenant', 'created_at', 'updated_at',
        ]
        read_only_fields = ['uuid', 'is_occupied', 'created_at', 'updated_at']

    def validate_building(self, value):
        """Ensure the landlord owns the property they are adding a unit to."""
        request = self.context.get('request')
        if request and value.owner != request.user:
            raise serializers.ValidationError(
                "You can only add units to your own properties."
            )
        return value


class PropertySerializer(serializers.ModelSerializer):
    units = UnitSerializer(many=True, read_only=True)
    owner_name = serializers.CharField(source='owner.full_name', read_only=True)
    total_units = serializers.ReadOnlyField()
    occupied_units = serializers.ReadOnlyField()
    occupancy_rate = serializers.ReadOnlyField()
    total_monthly_revenue = serializers.ReadOnlyField()
    full_address = serializers.ReadOnlyField()

    class Meta:
        model = Property
        fields = [
            'uuid', 'owner', 'owner_name', 'name', 'address', 'city',
            'state', 'zip_code', 'description', 'property_type', 'photo',
            'full_address', 'total_units', 'occupied_units',
            'occupancy_rate', 'total_monthly_revenue',
            'units', 'created_at', 'updated_at',
        ]
        read_only_fields = ['uuid', 'owner', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)


class PropertyListSerializer(serializers.ModelSerializer):
    total_units = serializers.ReadOnlyField()
    occupied_units = serializers.ReadOnlyField()
    occupancy_rate = serializers.ReadOnlyField()
    total_monthly_revenue = serializers.ReadOnlyField()

    class Meta:
        model = Property
        fields = [
            'uuid', 'name', 'address', 'city', 'state', 'zip_code',
            'property_type', 'photo', 'total_units', 'occupied_units',
            'occupancy_rate', 'total_monthly_revenue', 'created_at',
        ]