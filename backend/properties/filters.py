import django_filters
from .models import Property, Unit


class PropertyFilter(django_filters.FilterSet):
    city = django_filters.CharFilter(lookup_expr='icontains')
    state = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Property
        fields = ['city', 'state', 'property_type']


class UnitFilter(django_filters.FilterSet):
    min_rent = django_filters.NumberFilter(field_name='rent_price', lookup_expr='gte')
    max_rent = django_filters.NumberFilter(field_name='rent_price', lookup_expr='lte')

    class Meta:
        model = Unit
        fields = ['is_occupied', 'bedroom_count']