from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils import timezone

from .models import Lease


@receiver(post_save, sender=Lease)
def handle_lease_post_save(sender, instance, created, **kwargs):
    """
    When a Lease is created or updated:
    1. If active -> mark unit as occupied, mark tenant as active.
    2. If deactivated -> mark unit as vacant, mark tenant as inactive.
    """
    unit = instance.unit
    tenant = instance.tenant

    if instance.is_active:
        if not unit.is_occupied:
            unit.is_occupied = True
            unit.save(update_fields=['is_occupied', 'updated_at'])

        if not tenant.is_active_tenant:
            tenant.is_active_tenant = True
            tenant.save(update_fields=['is_active_tenant', 'updated_at'])

    else:
        other_active_leases_on_unit = (
            Lease.objects
            .filter(unit=unit, is_active=True)
            .exclude(pk=instance.pk)
            .exists()
        )
        if not other_active_leases_on_unit and unit.is_occupied:
            unit.is_occupied = False
            unit.save(update_fields=['is_occupied', 'updated_at'])

        other_active_leases_for_tenant = (
            Lease.objects
            .filter(tenant=tenant, is_active=True)
            .exclude(pk=instance.pk)
            .exists()
        )
        if not other_active_leases_for_tenant and tenant.is_active_tenant:
            tenant.is_active_tenant = False
            tenant.save(update_fields=['is_active_tenant', 'updated_at'])


@receiver(pre_save, sender=Lease)
def auto_resolve_lease_status(sender, instance, **kwargs):
    if instance.is_active and instance.end_date < timezone.now().date():
        instance.is_active = False