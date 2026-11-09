import uuid
from django.db import models
from django.conf import settings
from tenants.models import Tenant

class ClientFile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='files')
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    file = models.FileField(upload_to='client_files/')
    filename = models.CharField(max_length=255)
    category = models.CharField(max_length=50, default='General')
    uploaded_at = models.DateTimeField(auto_now_add=True)