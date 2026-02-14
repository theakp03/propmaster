from django.contrib import admin
from .models import Property, Unit


class UnitInline(admin.TabularInline):
    model = Unit
    extra = 1
    readonly_fields = ['uuid']


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner', 'city', 'state', 'total_units', 'occupancy_rate', 'created_at']
    list_filter = ['state', 'city', 'property_type']
    search_fields = ['name', 'address', 'city']
    inlines = [UnitInline]
    readonly_fields = ['uuid']


@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ['unit_number', 'building', 'bedroom_count', 'rent_price', 'is_occupied']
    list_filter = ['is_occupied', 'bedroom_count']
    search_fields = ['unit_number', 'building__name']
    readonly_fields = ['uuid']