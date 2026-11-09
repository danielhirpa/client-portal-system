from rest_framework import permissions

class HasTenantAccess(permissions.BasePermission):
    """Ensures users can only access data belonging to their assigned tenant."""
    def has_object_permission(self, request, view, obj):
        if request.user.role in ['AGENCY_ADMIN', 'AGENCY_PM']:
            return True
        tenant_id = getattr(obj, 'tenant_id', None) or getattr(getattr(obj, 'project', None), 'tenant_id', None)
        return tenant_id == request.user.tenant_id

class IsAgencyOrClientLead(permissions.BasePermission):
    """Restricts write operations to Agency roles or Client Leads."""
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.role in ['AGENCY_ADMIN', 'AGENCY_PM', 'CLIENT_LEAD']