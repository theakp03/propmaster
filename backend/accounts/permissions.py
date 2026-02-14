from rest_framework.permissions import BasePermission


class IsLandlord(BasePermission):
    message = "You must be a landlord to perform this action."

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == 'LANDLORD'
        )


class IsTenant(BasePermission):
    message = "You must be a tenant to perform this action."

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == 'TENANT'
        )


class IsLandlordOrTenantReadOnly(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.user.role == 'LANDLORD':
            return True
        if request.user.role == 'TENANT' and request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True
        return False


class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True
        if hasattr(obj, 'owner'):
            return obj.owner == request.user
        if hasattr(obj, 'landlord'):
            return obj.landlord == request.user
        if hasattr(obj, 'building'):
            return obj.building.owner == request.user
        if hasattr(obj, 'unit'):
            return obj.unit.building.owner == request.user
        return False