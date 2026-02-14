from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'role', 'is_active_tenant', 'is_active', 'created_at']
    list_filter = ['role', 'is_active', 'is_active_tenant']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('PropMaster Fields', {
            'fields': ('role', 'phone_number', 'avatar', 'date_of_birth', 'is_active_tenant'),
        }),
    )
