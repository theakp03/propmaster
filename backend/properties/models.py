import uuid
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from decimal import Decimal


class Property(models.Model):
    """
    A real estate property owned by a landlord.
    Can contain multiple units (apartments, rooms, etc.)
    """
    id = models.BigAutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='properties',
        limit_choices_to={'role': 'LANDLORD'},
    )
    name = models.CharField(max_length=200, help_text="Property name, e.g., 'Sunset Apartments'")
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)
    description = models.TextField(blank=True)
    property_type = models.CharField(
        max_length=20,
        choices=[
            ('APARTMENT', 'Apartment Building'),
            ('HOUSE', 'Single Family House'),
            ('CONDO', 'Condominium'),
            ('TOWNHOUSE', 'Townhouse'),
            ('COMMERCIAL', 'Commercial'),
        ],
        default='APARTMENT',
    )
    photo = models.FileField(upload_to='property_photos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'properties'
        verbose_name_plural = 'Properties'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['owner', 'city']),
            models.Index(fields=['zip_code']),
        ]

    def __str__(self):
        return f"{self.name} - {self.address}, {self.city}"

    @property
    def full_address(self):
        return f"{self.address}, {self.city}, {self.state} {self.zip_code}"

    @property
    def total_units(self):
        return self.units.count()

    @property
    def occupied_units(self):
        return self.units.filter(is_occupied=True).count()

    @property
    def occupancy_rate(self):
        total = self.total_units
        if total == 0:
            return 0.0
        return round((self.occupied_units / total) * 100, 1)

    @property
    def total_monthly_revenue(self):
        return (
            self.units
            .filter(is_occupied=True)
            .aggregate(total=models.Sum('rent_price'))['total']
            or Decimal('0.00')
        )


class Unit(models.Model):
    """An individual rentable unit within a property."""
    id = models.BigAutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True)

    # FIXED: renamed from "property" to "building"
    # because "property" clashes with Python's built-in @property decorator
    building = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='units',
        db_column='property_id',  # keeps the same DB column name
    )

    unit_number = models.CharField(max_length=20, help_text="e.g., 'Apt 4B', 'Unit 101'")
    bedroom_count = models.PositiveSmallIntegerField(default=1)
    bathroom_count = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        default=1.0,
        help_text="Supports half-baths, e.g., 1.5"
    )
    square_feet = models.PositiveIntegerField(blank=True, null=True)
    rent_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))],
    )
    is_occupied = models.BooleanField(default=False, db_index=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'units'
        ordering = ['building', 'unit_number']
        unique_together = ['building', 'unit_number']
        indexes = [
            models.Index(fields=['is_occupied']),
            models.Index(fields=['rent_price']),
        ]

    def __str__(self):
        return f"{self.building.name} - {self.unit_number}"

    @property
    def current_tenant(self):
        """Returns the tenant from the currently active lease, if any."""
        active_lease = self.leases.filter(is_active=True).select_related('tenant').first()
        return active_lease.tenant if active_lease else None