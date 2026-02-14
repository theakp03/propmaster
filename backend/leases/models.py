import uuid
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from decimal import Decimal


class Lease(models.Model):
    """A lease agreement between a landlord (via a Unit) and a tenant."""
    id = models.BigAutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True)
    unit = models.ForeignKey(
        'properties.Unit',
        on_delete=models.CASCADE,
        related_name='leases',
    )
    tenant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='leases',
        limit_choices_to={'role': 'TENANT'},
    )
    start_date = models.DateField()
    end_date = models.DateField()
    monthly_rent = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))],
    )
    security_deposit = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal('0.00'),
    )
    document = models.FileField(
        upload_to='lease_documents/%Y/%m/',
        blank=True,
        null=True,
        help_text="Uploaded signed lease document (PDF)."
    )
    is_active = models.BooleanField(default=True, db_index=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'leases'
        ordering = ['-start_date']
        indexes = [
            models.Index(fields=['is_active', 'end_date']),
            models.Index(fields=['tenant', 'is_active']),
        ]

    def __str__(self):
        return f"Lease: {self.tenant.full_name} @ {self.unit} ({self.start_date} - {self.end_date})"

    def clean(self):
        if self.start_date and self.end_date and self.start_date >= self.end_date:
            raise ValidationError({
                'end_date': 'End date must be after the start date.'
            })

        overlapping = Lease.objects.filter(
            unit=self.unit,
            is_active=True,
            start_date__lt=self.end_date,
            end_date__gt=self.start_date,
        ).exclude(pk=self.pk)

        if overlapping.exists():
            raise ValidationError(
                'This unit already has an active lease during the specified period.'
            )

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    @property
    def landlord(self):
        return self.unit.building.owner

    @property
    def duration_months(self):
        delta = self.end_date - self.start_date
        return round(delta.days / 30.44)