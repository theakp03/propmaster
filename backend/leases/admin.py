from django.contrib import admin
from .models import Lease


@admin.register(Lease)
class LeaseAdmin(admin.ModelAdmin):
    list_display = ['tenant', 'unit', 'start_date', 'end_date', 'monthly_rent', 'is_active']
    list_filter = ['is_active', 'start_date']
    search_fields = ['tenant__username', 'unit__unit_number']
    readonly_fields = ['uuid']
