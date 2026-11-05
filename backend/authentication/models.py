import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models
from tenants.models import Tenant

class User(AbstractUser):
    class Role(models.TextChoices):
        AGENCY_ADMIN = 'AGENCY_ADMIN', 'Agency Admin'
        AGENCY_PM = 'AGENCY_PM', 'Project Manager'
        CLIENT_LEAD = 'CLIENT_LEAD', 'Client Lead'
        CLIENT_VIEWER = 'CLIENT_VIEWER', 'Client Viewer'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CLIENT_VIEWER)

    def is_agency_staff(self):
        return self.role in [self.Role.AGENCY_ADMIN, self.Role.AGENCY_PM]