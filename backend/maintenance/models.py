import uuid
from django.db import models
from django.conf import settings


class MaintenanceRequest(models.Model):
    """A maintenance/repair request filed by a tenant for their unit."""

    class Status(models.TextChoices):
        NEW = 'NEW', 'New'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        COMPLETED = 'COMPLETED', 'Completed / Fixed'
        CANCELLED = 'CANCELLED', 'Cancelled'

    class Priority(models.TextChoices):
        LOW = 'LOW', 'Low'
        MEDIUM = 'MEDIUM', 'Medium'
        HIGH = 'HIGH', 'High'
        URGENT = 'URGENT', 'Urgent'

    id = models.BigAutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True)
    unit = models.ForeignKey(
        'properties.Unit',
        on_delete=models.CASCADE,
        related_name='maintenance_requests',
    )
    tenant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='maintenance_requests',
        limit_choices_to={'role': 'TENANT'},
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    # Changed from ImageField to FileField — no Pillow needed
    photo = models.FileField(
        upload_to='maintenance_photos/%Y/%m/',
        blank=True,
        null=True,
        help_text="Photo of the issue."
    )
    status = models.CharField(
        max_length=15,
        choices=Status.choices,
        default=Status.NEW,
        db_index=True,
    )
    priority = models.CharField(
        max_length=10,
        choices=Priority.choices,
        default=Priority.MEDIUM,
        db_index=True,
    )
    landlord_notes = models.TextField(
        blank=True,
        help_text="Notes from the landlord/manager about the request."
    )
    resolved_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'maintenance_requests'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'priority']),
            models.Index(fields=['tenant', 'status']),
        ]

    def __str__(self):
        return f"[{self.get_priority_display()}] {self.title} - {self.get_status_display()}"

    @property
    def landlord(self):
        return self.unit.property.owner