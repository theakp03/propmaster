from django.contrib.auth.models import UserManager as BaseUserManager


class LandlordManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset().filter(role='LANDLORD')


class TenantManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset().filter(role='TENANT')
