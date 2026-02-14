from django.contrib import admin
from .models import MaintenanceRequest


@admin.register(MaintenanceRequest)
class MaintenanceRequestAdmin(admin.ModelAdmin):
    list_display = ['title', 'unit', 'tenant', 'status', 'priority', 'created_at']
    list_filter = ['status', 'priority']
    search_fields = ['title', 'description', 'tenant__username']
    readonly_fields = ['uuid']
