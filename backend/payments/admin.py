from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'lease', 'amount', 'payment_type', 'payment_status', 'date_paid']
    list_filter = ['payment_type', 'payment_status']
    search_fields = ['transaction_id']
    readonly_fields = ['uuid']
