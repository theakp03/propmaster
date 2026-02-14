import uuid
from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal


class Payment(models.Model):
    """Records a financial transaction associated with a lease."""

    class PaymentType(models.TextChoices):
        RENT = 'RENT', 'Rent'
        LATE_FEE = 'LATE_FEE', 'Late Fee'
        DEPOSIT = 'DEPOSIT', 'Security Deposit'
        REFUND = 'REFUND', 'Refund'
        OTHER = 'OTHER', 'Other'

    class PaymentStatus(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        COMPLETED = 'COMPLETED', 'Completed'
        FAILED = 'FAILED', 'Failed'
        REFUNDED = 'REFUNDED', 'Refunded'

    id = models.BigAutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True)
    lease = models.ForeignKey(
        'leases.Lease',
        on_delete=models.CASCADE,
        related_name='payments',
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))],
    )
    date_paid = models.DateTimeField()
    transaction_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        null=True,
        help_text="External payment gateway transaction ID."
    )
    payment_type = models.CharField(
        max_length=10,
        choices=PaymentType.choices,
        default=PaymentType.RENT,
    )
    payment_status = models.CharField(
        max_length=10,
        choices=PaymentStatus.choices,
        default=PaymentStatus.PENDING,
    )
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'payments'
        ordering = ['-date_paid']
        indexes = [
            models.Index(fields=['payment_type', 'payment_status']),
            models.Index(fields=['date_paid']),
        ]

    def __str__(self):
        return (
            f"Payment #{self.id} - ${self.amount} "
            f"({self.get_payment_type_display()}) - {self.get_payment_status_display()}"
        )

    @property
    def tenant(self):
        return self.lease.tenant

    @property
    def landlord(self):
        return self.lease.unit.property.owner
